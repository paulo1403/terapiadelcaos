import { Elysia, t } from 'elysia'
import * as assets from './assets.service'

export const assetsRoutes = new Elysia({ name: 'assets' })
  .get(
    '/assets',
    ({ query }) => assets.listAssets(query.limit ?? 24, query.offset ?? 0, query.q),
    {
      query: t.Object({
        limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
        offset: t.Optional(t.Numeric({ minimum: 0 })),
        q: t.Optional(t.String()),
      }),
    },
  )
  .patch(
    '/assets/:id',
    async ({ params, body }) => {
      await assets.renameAsset(params.id, body.title)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }), body: t.Object({ title: t.String() }) },
  )
  .post('/assets/sync', async () => ({ total: await assets.syncFromBucket() }))
  .delete(
    '/assets/:id',
    async ({ params }) => {
      await assets.deleteAsset(params.id)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
