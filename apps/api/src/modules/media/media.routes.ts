import { Elysia, t } from 'elysia'
import * as media from './media.service'

export const mediaRoutes = new Elysia({ name: 'media' })
  .get(
    '/objects',
    ({ query }) =>
      media.listObjects(query.prefix, query.cursor, query.urls === '1'),
    {
      query: t.Object({
        prefix: t.Optional(t.String()),
        cursor: t.Optional(t.String()),
        urls: t.Optional(t.String()),
      }),
    },
  )
  .get(
    '/play',
    async ({ query }) => ({ url: await media.presignPlay(query.key, query.expires) }),
    { query: t.Object({ key: t.String(), expires: t.Optional(t.Number()) }) },
  )
  .delete(
    '/object',
    async ({ query }) => {
      await media.deleteObject(query.key)
      return { ok: true }
    },
    { query: t.Object({ key: t.String() }) },
  )
