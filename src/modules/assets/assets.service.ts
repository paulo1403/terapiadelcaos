import { db } from '../../lib/db'
import { deleteObject, listObjects, presignPlay } from '../media/media.service'

export type Asset = {
  id: number
  key: string
  title: string | null
  size: number
  mime: string | null
  created_at: string
  url?: string
}

const toTitle = (key: string) =>
  decodeURIComponent(key.split('/').pop() ?? key).replace(/\.[^.]+$/, '')

export async function listAssets(limit: number, offset: number, q?: string) {
  const term = q ? `%${q}%` : null
  const rows = (await db`
    select id, key, title, size, mime, created_at
    from assets
    where (${term}::text is null or title ilike ${term} or key ilike ${term})
    order by created_at desc, id desc
    limit ${limit} offset ${offset}
  `) as unknown as Asset[]
  const [count] = (await db`
    select count(*)::int as count from assets
    where (${term}::text is null or title ilike ${term} or key ilike ${term})
  `) as unknown as { count: number }[]
  for (const row of rows) row.url = await presignPlay(row.key, 21600)
  return { items: rows, total: count?.count ?? 0, limit, offset }
}

export async function deleteAsset(id: number) {
  const [row] = (await db`select key from assets where id = ${id}`) as unknown as {
    key: string
  }[]
  if (!row) return
  await deleteObject(row.key)
  await db`delete from assets where id = ${id}`
}

export async function renameAsset(id: number, title: string) {
  await db`update assets set title = ${title}, updated_at = now() where id = ${id}`
}

export async function registerAsset(
  key: string,
  extra: { title?: string; size?: number; mime?: string } = {},
) {
  const title = extra.title ?? toTitle(key)
  const size = extra.size ?? 0
  await db`
    insert into assets (key, title, size, mime)
    values (${key}, ${title}, ${size}, ${extra.mime ?? null})
    on conflict (key) do update set size = excluded.size
  `
}

export async function syncFromBucket() {
  let cursor: string | undefined
  do {
    const res = await listObjects('', cursor)
    for (const o of res.objects) await registerAsset(o.key, { size: o.size })
    cursor = res.next ?? undefined
  } while (cursor)
  const [count] = (await db`select count(*)::int as count from assets`) as unknown as {
    count: number
  }[]
  return count?.count ?? 0
}
