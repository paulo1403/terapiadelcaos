import { db } from '../../lib/db'
import { presignPlay } from '../media/media.service'

export type Testimonial = {
  id: number
  asset_id: number
  title: string
  quote: string
  author: string
  poster_key: string | null
  web_key: string | null
  status: string
  published: boolean
  position: number
  asset_title?: string | null
  posterUrl?: string | null
  videoUrl?: string | null
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const rows = (await db`
    select t.id, t.asset_id, t.title, t.quote, t.author, t.poster_key, t.web_key, t.status,
           t.published, t.position, a.title as asset_title
    from testimonials t join assets a on a.id = t.asset_id
    order by t.position, t.id
  `) as unknown as Testimonial[]
  for (const row of rows) {
    row.posterUrl = row.poster_key ? await presignPlay(row.poster_key, 21600) : null
    row.videoUrl = row.web_key ? await presignPlay(row.web_key, 21600) : null
  }
  return rows
}

export async function createTestimonial(input: {
  asset_id: number
  title?: string
  quote?: string
  author?: string
}) {
  const [row] = (await db`
    insert into testimonials (asset_id, title, quote, author, status, position)
    values (${input.asset_id}, ${input.title ?? ''}, ${input.quote ?? ''}, ${input.author ?? ''},
            'pending', (select coalesce(max(position) + 1, 0) from testimonials))
    returning id
  `) as unknown as { id: number }[]
  return row.id
}

export async function updateTestimonial(
  id: number,
  patch: { title?: string; quote?: string; author?: string; published?: boolean; position?: number },
) {
  const [current] = (await db`
    select title, quote, author, published, position from testimonials where id = ${id}
  `) as unknown as {
    title: string
    quote: string
    author: string
    published: boolean
    position: number
  }[]
  if (!current) return null
  await db`
    update testimonials set
      title = ${patch.title ?? current.title},
      quote = ${patch.quote ?? current.quote},
      author = ${patch.author ?? current.author},
      published = ${patch.published ?? current.published},
      position = ${patch.position ?? current.position}
    where id = ${id}
  `
  return { ok: true }
}

export async function deleteTestimonial(id: number) {
  await db`delete from testimonials where id = ${id}`
}

export async function publicTestimonials() {
  const rows = (await db`
    select id, title, quote, author, poster_key, web_key
    from testimonials
    where published and status = 'ready'
    order by position, id
  `) as unknown as Testimonial[]
  const out = []
  for (const row of rows) {
    out.push({
      id: row.id,
      title: row.title,
      quote: row.quote,
      author: row.author,
      posterUrl: row.poster_key ? await presignPlay(row.poster_key, 21600) : null,
      videoUrl: row.web_key ? await presignPlay(row.web_key, 21600) : null,
    })
  }
  return out
}
