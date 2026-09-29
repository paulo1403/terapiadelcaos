import { Elysia, t } from 'elysia'
import { publicCourses } from '../courses/courses.service'
import { presignPlay } from '../media/media.service'
import { listProgress, setProgress } from '../progress/progress.service'
import {
  accessForTokens,
  emailForCourse,
  grantActive,
  readTokens,
  resolveLesson,
  verifyToken,
} from './access.service'

const COOKIE = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
} as const

export const publicAccessRoutes = new Elysia({ name: 'public-access' })
  .get('/api/courses', ({ cookie }) => publicCourses(readTokens(cookie.access?.value)))
  .post(
    '/api/access/redeem',
    async ({ body, cookie, status }) => {
      const grantId = verifyToken(body.token)
      if (!grantId || !(await grantActive(grantId))) {
        return status(403, { error: 'invalid access' })
      }
      const tokens = readTokens(cookie.access?.value)
      if (!tokens.includes(body.token)) tokens.push(body.token)
      cookie.access.set({ value: JSON.stringify(tokens), ...COOKIE })
      return { ok: true }
    },
    { body: t.Object({ token: t.String() }) },
  )
  .post(
    '/api/access/play',
    async ({ body, cookie, status }) => {
      const lesson = await resolveLesson(body.lessonId)
      if (!lesson) return status(404, { error: 'not found' })
      const allowed =
        lesson.free ||
        (await accessForTokens(readTokens(cookie.access?.value))).has(Number(lesson.course_id))
      if (!allowed) return status(403, { error: 'no access' })
      if (!lesson.key) return status(404, { error: 'not found' })
      return { url: await presignPlay(lesson.key, 900) }
    },
    { body: t.Object({ lessonId: t.Number() }) },
  )
  .get(
    '/api/progress',
    async ({ query, cookie }) => {
      const email = await emailForCourse(readTokens(cookie.access?.value), query.courseId)
      if (!email) return { completed: [] }
      return { completed: await listProgress(email, query.courseId) }
    },
    { query: t.Object({ courseId: t.Numeric() }) },
  )
  .post(
    '/api/progress',
    async ({ body, cookie, status }) => {
      const lesson = await resolveLesson(body.lessonId)
      if (!lesson) return status(404, { error: 'not found' })
      const email = await emailForCourse(readTokens(cookie.access?.value), Number(lesson.course_id))
      if (!email) return status(403, { error: 'no access' })
      await setProgress(email, body.lessonId, body.completed)
      return { ok: true }
    },
    { body: t.Object({ lessonId: t.Number(), completed: t.Boolean() }) },
  )
