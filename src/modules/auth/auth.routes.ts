import { Elysia, t } from 'elysia'
import { changePassword, createSession, verifyCredentials, verifySession, SESSION_TTL } from './auth.service'

const COOKIE = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/admin',
  maxAge: SESSION_TTL,
} as const

export const authRoutes = new Elysia({ name: 'auth', prefix: '/admin/auth' })
  .post(
    '/login',
    async ({ body, cookie, status }) => {
      if (!(await verifyCredentials(body.username, body.password))) {
        return status(401, { error: 'bad credentials' })
      }
      cookie.session.set({ value: createSession(body.username), ...COOKIE })
      return { ok: true }
    },
    { body: t.Object({ username: t.String(), password: t.String() }) },
  )
  .post('/logout', ({ cookie }) => {
    cookie.session.remove()
    return { ok: true }
  })
  .post(
    '/password',
    async ({ body, status }) => {
      if (!(await changePassword(body.current, body.new))) {
        return status(401, { error: 'bad credentials' })
      }
      return { ok: true }
    },
    { body: t.Object({ current: t.String(), new: t.String({ minLength: 6 }) }) },
  )
  .get('/me', ({ cookie }) => ({
    authenticated: verifySession(
      typeof cookie.session.value === 'string' ? cookie.session.value : undefined,
    ),
  }))
