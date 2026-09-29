import { createHmac, timingSafeEqual } from 'node:crypto'
import { db } from '../../lib/db'
import { env } from '../../config/env'

const sign = (data: string) =>
  createHmac('sha256', env.SESSION_SECRET).update(data).digest('base64url')

export function grantToken(grantId: number) {
  const payload = String(grantId)
  return `${payload}.${sign('grant:' + payload)}`
}

export function grantLink(grantId: number) {
  return `${env.SITE_URL}/acceso/${grantToken(grantId)}`
}

export function verifyToken(token?: string): number | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = sign('grant:' + payload)
  if (signature.length !== expected.length) return null
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  const id = Number(payload)
  return Number.isInteger(id) && id > 0 ? id : null
}

export function readTokens(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((t): t is string => typeof t === 'string')
  }
  if (typeof value !== 'string' || !value) return []
  const parse = (text: string) => {
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === 'string') : []
  }
  try {
    return parse(value)
  } catch {
    try {
      return parse(decodeURIComponent(value))
    } catch {
      return []
    }
  }
}

export async function grantActive(id: number): Promise<boolean> {
  const [row] = (await db`
    select 1 from grants
    where id = ${id} and status = 'active' and (expires_at is null or expires_at > now())
  `) as unknown as { '?column?': number }[]
  return !!row
}

export async function accessForTokens(tokens: string[]): Promise<Set<number>> {
  const courseIds = new Set<number>()
  for (const token of tokens) {
    const grantId = verifyToken(token)
    if (!grantId) continue
    const [row] = (await db`
      select course_id from grants
      where id = ${grantId} and status = 'active' and (expires_at is null or expires_at > now())
    `) as unknown as { course_id: number }[]
    if (row) courseIds.add(Number(row.course_id))
  }
  return courseIds
}

/** Email del alumno con acceso vigente al curso (a partir de sus tokens). */
export async function emailForCourse(tokens: string[], courseId: number): Promise<string | null> {
  for (const token of tokens) {
    const grantId = verifyToken(token)
    if (!grantId) continue
    const [row] = (await db`
      select email, course_id from grants
      where id = ${grantId} and status = 'active' and (expires_at is null or expires_at > now())
    `) as unknown as { email: string; course_id: number }[]
    if (row && Number(row.course_id) === courseId) return row.email
  }
  return null
}

export type Grant = {
  id: number
  email: string
  course_id: number
  course_title: string
  status: string
  expires_at: string | null
  created_at: string
  link?: string
}

export async function listGrants(): Promise<Grant[]> {
  const rows = (await db`
    select g.id, g.email, g.course_id, c.title as course_title, g.status, g.expires_at, g.created_at
    from grants g join courses c on c.id = g.course_id
    order by g.created_at desc, g.id desc
  `) as unknown as Grant[]
  return rows.map((row) => ({ ...row, link: grantLink(Number(row.id)) }))
}

export async function createGrant(email: string, courseId: number, expiresAt?: string | null) {
  const [row] = (await db`
    insert into grants (email, course_id, expires_at, source, status)
    values (${email.trim().toLowerCase()}, ${courseId}, ${expiresAt ?? null}, 'manual', 'active')
    on conflict (lower(email), course_id) do update
      set status = 'active', expires_at = excluded.expires_at, created_at = now()
    returning id
  `) as unknown as { id: number }[]
  return { id: row.id, link: grantLink(Number(row.id)) }
}

export async function revokeGrant(id: number) {
  await db`update grants set status = 'revoked' where id = ${id}`
}

export async function resolveLesson(lessonId: number) {
  const [row] = (await db`
    select l.id, l.free, l.course_id, a.key
    from lessons l left join assets a on a.id = l.asset_id
    where l.id = ${lessonId}
  `) as unknown as { id: number; free: boolean; course_id: number; key: string | null }[]
  return row ?? null
}
