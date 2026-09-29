import { Elysia, t } from 'elysia'
import * as testimonials from './testimonials.service'
import { processTestimonial } from './testimonials.process'

export const testimonialsRoutes = new Elysia({ name: 'testimonials' })
  .get('/testimonials', () => testimonials.listTestimonials())
  .post(
    '/testimonials',
    async ({ body }) => {
      const id = await testimonials.createTestimonial(body)
      void processTestimonial(id)
      return { id }
    },
    {
      body: t.Object({
        asset_id: t.Number(),
        title: t.Optional(t.String()),
        quote: t.Optional(t.String()),
        author: t.Optional(t.String()),
      }),
    },
  )
  .patch(
    '/testimonials/:id',
    ({ params, body }) => testimonials.updateTestimonial(params.id, body),
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({
        title: t.Optional(t.String()),
        quote: t.Optional(t.String()),
        author: t.Optional(t.String()),
        published: t.Optional(t.Boolean()),
        position: t.Optional(t.Number()),
      }),
    },
  )
  .delete(
    '/testimonials/:id',
    async ({ params }) => {
      await testimonials.deleteTestimonial(params.id)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post(
    '/testimonials/:id/reprocess',
    ({ params }) => {
      void processTestimonial(params.id)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
