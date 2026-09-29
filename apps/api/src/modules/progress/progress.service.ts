import { db } from '../../lib/db'

export async function listProgress(email: string, courseId: number): Promise<number[]> {
  const rows = (await db`
    select lp.lesson_id
    from lesson_progress lp join lessons l on l.id = lp.lesson_id
    where lp.email = ${email} and l.course_id = ${courseId}
  `) as unknown as { lesson_id: number }[]
  return rows.map((r) => Number(r.lesson_id))
}

export async function setProgress(email: string, lessonId: number, completed: boolean) {
  if (completed) {
    await db`
      insert into lesson_progress (email, lesson_id) values (${email}, ${lessonId})
      on conflict (email, lesson_id) do nothing
    `
  } else {
    await db`delete from lesson_progress where email = ${email} and lesson_id = ${lessonId}`
  }
}
