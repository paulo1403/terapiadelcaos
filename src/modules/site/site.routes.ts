import { Elysia, t } from 'elysia'
import { getSite, saveSite } from './site.service'

const sectionSchema = t.Object({
  id: t.String(),
  label: t.String(),
  visible: t.Boolean(),
})

export const siteRoutes = new Elysia({ name: 'site' })
  .get('/settings/site', () => getSite())
  .put(
    '/settings/site',
    ({ body }) => saveSite(body),
    {
      body: t.Object({
        sections: t.Optional(t.Array(sectionSchema)),
        content: t.Optional(t.Record(t.String(), t.String())),
      }),
    },
  )
