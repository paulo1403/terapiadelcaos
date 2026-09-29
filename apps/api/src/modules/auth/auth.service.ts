import { createHmac, timingSafeEqual } from 'node:crypto'
import { env } from '../../config/env'
import { getAdmin, saveAdmin } from '../settings/settings.service'

const sign = (data: string) =>
  createHmac('sha256', env.SESSION_SECRET).update(data).digest('base64url')

const TTL_SECONDS = 60 * 60 * 24 * 30

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

/** Cookie de sesión: payload base64url + firma HMAC. */
export function createSession(username: string) {
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: Date.now() + TTL_SECONDS * 1000 }),
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySession(token?: string): boolean {
  if (!token || !env.SESSION_SECRET) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  const expected = sign(payload)
  if (signature.length !== expected.length) return false
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

/** Usuario + contraseña. No corta circuito para no filtrar cuál falló. */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const admin = await getAdmin()
  const userOk = safeEqual(username, admin.username)
  const passOk = admin.passwordHash
    ? await Bun.password.verify(password, admin.passwordHash)
    : false
  return userOk && passOk
}

export async function changePassword(current: string, next: string): Promise<boolean> {
  const admin = await getAdmin()
  if (!admin.passwordHash) return false
  if (!(await Bun.password.verify(current, admin.passwordHash))) return false
  await saveAdmin({ password_hash: await Bun.password.hash(next) })
  return true
}

export const SESSION_TTL = TTL_SECONDS
