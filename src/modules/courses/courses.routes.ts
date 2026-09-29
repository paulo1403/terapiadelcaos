import { Elysia, t } from 'elysia'
import * as courses from './courses.service'

const courseBody = t.Object({
  title: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String()),
  cover_asset_id: t.Optional(t.Nullable(t.Number())),
  published: t.Optional(t.Boolean()),
  position: t.Optional(t.Number()),
})

export const coursesRoutes = new Elysia({ name: 'courses' })
  .get('/courses', () => courses.listCourses())
  .post(
    '/courses',
    ({ body }) => courses.createCourse({ ...body, title: body.title ?? 'Curso' }),
    { body: courseBody },
  )
  .get('/courses/:id', ({ params }) => courses.getCourse(params.id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .put(
    '/courses/:id',
    ({ params, body }) => courses.updateCourse(params.id, body),
    { params: t.Object({ id: t.Numeric() }), body: courseBody },
  )
  .delete(
    '/courses/:id',
    async ({ params }) => {
      await courses.deleteCourse(params.id)
      return { ok: true }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post(
    '/courses/:id/lessons',
    ({ params, body }) => courses.addLesson(params.id, body),
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({
        asset_id: t.Optional(t.Nullable(t.Number())),
        module_id: t.Optional(t.Nullable(t.Number())),
        title: t.String(),
        type: t.Optional(t.String()),
        body: t.Optional(t.String()),
      }),
    },
  )
  .patch(
    '/courses/lessons/:id',
    ({ params, body }) => courses.updateLesson(params.id, body),
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({
        title: t.Optional(t.String()),
        position: t.Optional(t.Number()),
        free: t.Optional(t.Boolean()),
        type: t.Optional(t.String()),
        body: t.Optional(t.String()),
        module_id: t.Optional(t.Nullable(t.Number())),
      }),
    },
  )
  .delete(
    '/courses/lessons/:id',
    ({ params }) => courses.deleteLesson(params.id),
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post(
    '/courses/:id/reorder',
    ({ params, body }) => courses.reorderLessons(params.id, body.ids),
    { params: t.Object({ id: t.Numeric() }), body: t.Object({ ids: t.Array(t.Number()) }) },
  )
  .post(
    '/courses/:id/modules',
    ({ params, body }) => courses.addModule(params.id, body.title),
    { params: t.Object({ id: t.Numeric() }), body: t.Object({ title: t.String() }) },
  )
  .patch(
    '/modules/:id',
    ({ params, body }) => courses.updateModule(params.id, body),
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({ title: t.Optional(t.String()), position: t.Optional(t.Number()) }),
    },
  )
  .delete(
    '/modules/:id',
    ({ params }) => courses.deleteModule(params.id),
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post(
    '/courses/:id/modules/reorder',
    ({ params, body }) => courses.reorderModules(params.id, body.ids),
    { params: t.Object({ id: t.Numeric() }), body: t.Object({ ids: t.Array(t.Number()) }) },
  )
