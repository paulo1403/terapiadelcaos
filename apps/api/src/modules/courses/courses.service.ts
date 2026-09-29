import { db } from '../../lib/db'
import { presignPlay } from '../media/media.service'
import { accessForTokens } from '../access/access.service'

export type Course = {
  id: number
  slug: string
  title: string
  description: string
  cover_asset_id: number | null
  published: boolean
  position: number
  lesson_count: number
  cover_url?: string | null
}

export type Lesson = {
  id: number
  course_id: number
  module_id: number | null
  asset_id: number | null
  title: string
  position: number
  free: boolean
  type: string
  body: string
  key?: string | null
  url?: string | null
}

export type Module = {
  id: number
  course_id: number
  title: string
  position: number
  lessons: Lesson[]
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'curso'

async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title)
  const [existing] = (await db`
    select slug from courses where slug = ${base} or slug like ${base + '-%'}
  `) as unknown as { slug: string }[]
  if (!existing) return base
  return `${base}-${Date.now().toString(36).slice(-4)}`
}

async function lessonsFor(courseId: number): Promise<Lesson[]> {
  return (await db`
    select l.id, l.course_id, l.module_id, l.asset_id, l.title, l.position, l.free, l.type, l.body, a.key
    from lessons l left join assets a on a.id = l.asset_id
    where l.course_id = ${courseId}
    order by l.position, l.id
  `) as unknown as Lesson[]
}

async function modulesFor(courseId: number): Promise<Module[]> {
  const rows = (await db`
    select id, course_id, title, position from modules
    where course_id = ${courseId}
    order by position, id
  `) as unknown as Module[]
  return rows
}

export async function listCourses(): Promise<Course[]> {
  const rows = (await db`
    select c.id, c.slug, c.title, c.description, c.cover_asset_id, c.published, c.position,
      (select count(*) from lessons l where l.course_id = c.id)::int as lesson_count,
      a.key as cover_key
    from courses c
    left join assets a on a.id = c.cover_asset_id
    order by c.position, c.id
  `) as unknown as (Course & { cover_key: string | null })[]
  for (const row of rows) {
    row.cover_url = row.cover_key ? await presignPlay(row.cover_key, 21600) : null
  }
  return rows
}

export async function getCourse(id: number) {
  const [course] = (await db`
    select c.id, c.slug, c.title, c.description, c.cover_asset_id, c.published, c.position,
      (select count(*) from lessons l where l.course_id = c.id)::int as lesson_count,
      a.key as cover_key
    from courses c
    left join assets a on a.id = c.cover_asset_id
    where c.id = ${id}
  `) as unknown as (Course & { cover_key: string | null })[]
  if (!course) return null

  const lessons = await lessonsFor(id)
  for (const lesson of lessons) {
    if (lesson.type !== 'text' && lesson.key) lesson.url = await presignPlay(lesson.key, 21600)
  }
  const modules = await modulesFor(id)
  for (const mod of modules) mod.lessons = lessons.filter((l) => l.module_id === mod.id)

  course.cover_url = course.cover_key ? await presignPlay(course.cover_key, 21600) : null
  return {
    ...course,
    modules,
    ungrouped: lessons.filter((l) => l.module_id === null),
  }
}

export async function createCourse(input: {
  title: string
  description?: string
  cover_asset_id?: number | null
  published?: boolean
}) {
  const slug = await uniqueSlug(input.title)
  const [row] = (await db`
    insert into courses (slug, title, description, cover_asset_id, published, position)
    values (${slug}, ${input.title}, ${input.description ?? ''}, ${input.cover_asset_id ?? null},
            ${input.published ?? false},
            (select coalesce(max(position) + 1, 0) from courses))
    returning id
  `) as unknown as { id: number }[]
  return getCourse(row.id)
}

export async function updateCourse(
  id: number,
  patch: {
    title?: string
    description?: string
    cover_asset_id?: number | null
    published?: boolean
    position?: number
  },
) {
  const [current] = (await db`
    select title, description, cover_asset_id, published, position from courses where id = ${id}
  `) as unknown as {
    title: string
    description: string
    cover_asset_id: number | null
    published: boolean
    position: number
  }[]
  if (!current) return null
  const cover = 'cover_asset_id' in patch ? patch.cover_asset_id : current.cover_asset_id
  await db`
    update courses set title = ${patch.title ?? current.title},
      description = ${patch.description ?? current.description},
      cover_asset_id = ${cover ?? null}, published = ${patch.published ?? current.published},
      position = ${patch.position ?? current.position}
    where id = ${id}
  `
  return getCourse(id)
}

export async function deleteCourse(id: number) {
  await db`delete from courses where id = ${id}`
}

/* ---- Módulos ---- */
export async function addModule(courseId: number, title: string) {
  await db`
    insert into modules (course_id, title, position)
    values (${courseId}, ${title},
            (select coalesce(max(position) + 1, 0) from modules where course_id = ${courseId}))
  `
  return getCourse(courseId)
}

export async function updateModule(id: number, patch: { title?: string; position?: number }) {
  const [row] = (await db`select course_id, title, position from modules where id = ${id}`) as unknown as {
    course_id: number
    title: string
    position: number
  }[]
  if (!row) return null
  await db`
    update modules set title = ${patch.title ?? row.title}, position = ${patch.position ?? row.position}
    where id = ${id}
  `
  return getCourse(row.course_id)
}

export async function deleteModule(id: number) {
  const [row] = (await db`select course_id from modules where id = ${id}`) as unknown as {
    course_id: number
  }[]
  if (!row) return null
  await db`delete from modules where id = ${id}`
  return getCourse(row.course_id)
}

export async function reorderModules(courseId: number, ids: number[]) {
  for (let i = 0; i < ids.length; i++) {
    await db`update modules set position = ${i} where id = ${ids[i]} and course_id = ${courseId}`
  }
  return getCourse(courseId)
}

/* ---- Lecciones ---- */
export async function addLesson(
  courseId: number,
  input: { module_id?: number | null; asset_id?: number | null; title: string; type?: string; body?: string },
) {
  const type = input.type ?? 'video'
  await db`
    insert into lessons (course_id, module_id, asset_id, title, type, body, position)
    values (${courseId}, ${input.module_id ?? null}, ${input.asset_id ?? null},
            ${input.title}, ${type}, ${input.body ?? ''},
            (select coalesce(max(position) + 1, 0) from lessons where course_id = ${courseId}))
  `
  return getCourse(courseId)
}

export async function updateLesson(
  id: number,
  patch: { title?: string; position?: number; free?: boolean; type?: string; body?: string; module_id?: number | null },
) {
  const [current] = (await db`
    select course_id, title, position, free, type, body, module_id from lessons where id = ${id}
  `) as unknown as {
    course_id: number
    title: string
    position: number
    free: boolean
    type: string
    body: string
    module_id: number | null
  }[]
  if (!current) return null
  await db`
    update lessons set title = ${patch.title ?? current.title},
      position = ${patch.position ?? current.position},
      free = ${patch.free ?? current.free},
      type = ${patch.type ?? current.type},
      body = ${patch.body ?? current.body},
      module_id = ${'module_id' in patch ? patch.module_id ?? null : current.module_id}
    where id = ${id}
  `
  return getCourse(current.course_id)
}

export async function deleteLesson(id: number) {
  const [row] = (await db`delete from lessons where id = ${id} returning course_id`) as unknown as {
    course_id: number
  }[]
  return row ? getCourse(row.course_id) : null
}

export async function reorderLessons(courseId: number, ids: number[]) {
  for (let i = 0; i < ids.length; i++) {
    await db`update lessons set position = ${i} where id = ${ids[i]} and course_id = ${courseId}`
  }
  return getCourse(courseId)
}

/* ---- Público (con gating) ---- */
export async function publicCourses(tokens: string[] = []) {
  const accessible = await accessForTokens(tokens)
  const rows = (await db`
    select c.id, c.slug, c.title, c.description, c.cover_asset_id,
      (select count(*) from lessons l where l.course_id = c.id)::int as lesson_count
    from courses c
    where c.published
    order by c.position, c.id
  `) as unknown as (Course & { cover_key?: string | null })[]

  const result = []
  for (const course of rows) {
    const hasAccess = accessible.has(Number(course.id))
    const lessons = await lessonsFor(Number(course.id))
    const out: {
      id: number
      module_id: number | null
      title: string
      type: string
      free: boolean
      url: string | null
      body: string
    }[] = []
    for (const l of lessons) {
      const canPlay = l.free || hasAccess
      out.push({
        id: l.id,
        module_id: l.module_id,
        title: l.title,
        type: l.type,
        free: l.free,
        url: l.type !== 'text' && canPlay && l.key ? await presignPlay(l.key, 21600) : null,
        body: l.type === 'text' && canPlay ? l.body : '',
      })
    }
    const mods = await modulesFor(Number(course.id))
    const pubModules = mods.map((m) => ({
      id: m.id,
      title: m.title,
      lessons: out.filter((l) => l.module_id === m.id),
    }))

    const [cover] = (await db`select key from assets where id = ${course.cover_asset_id}`) as unknown as {
      key: string
    }[]
    result.push({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      coverUrl: cover?.key ? await presignPlay(cover.key, 21600) : null,
      hasAccess,
      modules: pubModules,
      ungrouped: out.filter((l) => l.module_id === null),
    })
  }
  return result
}
