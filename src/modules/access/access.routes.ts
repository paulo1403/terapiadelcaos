import { Elysia, t } from 'elysia'
import * as access from './access.service'

export const accessRoutes = new Elysia({ name: 'access' })
  .get('/grants', () => access.listGrants())
  .post(
    '/grants',
    ({ body }) => access.createGrant(body.email, body.course_id, body.expires_at),
    {
      body: t.Object({
        email: t.String({ minLength: 3 }),
        course_id: t.Number(),
        expires_at: t.Optional(t.Nullable(t.String())),
      }),
    },
  )
  .post(
    '/grants/:id/revoke',
    async ({ params }) => {
      await access.revokeGrant(params.id)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
