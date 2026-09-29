import { env } from '../config/env'
import { verifySession } from '../modules/auth/auth.service'

type AuthContext = {
  headers: { authorization?: string }
  cookie: { session?: { value?: unknown } }
  status: (code: number, body: unknown) => unknown
}

// Acepta bearer token (máquina) o cookie de sesión (panel). Cloudflare Access
// puede envolverlo como capa extra en el borde.
export function requireAuth({ headers, cookie, status }: AuthContext) {
  if (env.ADMIN_TOKEN && headers.authorization === `Bearer ${env.ADMIN_TOKEN}`) return
  const token = typeof cookie.session?.value === 'string' ? cookie.session.value : undefined
  if (verifySession(token)) return
  return status(401, { error: 'unauthorized' })
}
