import { Elysia } from 'elysia'
import { env } from './config/env'
import { requireAuth } from './middleware/auth'
import { authRoutes } from './modules/auth/auth.routes'
import { mediaRoutes } from './modules/media/media.routes'
import { uploadRoutes } from './modules/upload/upload.routes'
import { assetsRoutes } from './modules/assets/assets.routes'
import { settingsRoutes } from './modules/settings/settings.routes'
import { siteRoutes } from './modules/site/site.routes'
import { publicSite } from './modules/site/site.service'
import { coursesRoutes } from './modules/courses/courses.routes'
import { accessRoutes } from './modules/access/access.routes'
import { publicAccessRoutes } from './modules/access/public.routes'
import { testimonialsRoutes } from './modules/testimonials/testimonials.routes'
import { publicTestimonials } from './modules/testimonials/testimonials.service'

// Composición de la app (sin listen): sano de testear y de extender con módulos.
export function createApp() {
  return new Elysia()
    .get('/health', () => ({ ok: true, bucket: env.S3.bucket }))
    .get('/admin/health', () => ({ ok: true, bucket: env.S3.bucket }))
    .get('/api/site', () => publicSite())
    .get('/api/testimonials', () => publicTestimonials())
    .use(publicAccessRoutes)
    .use(authRoutes)
    .guard({ beforeHandle: requireAuth }, (app) =>
      app.group('/admin/api', (api) =>
        api
          .use(mediaRoutes)
          .use(uploadRoutes)
          .use(assetsRoutes)
          .use(settingsRoutes)
          .use(siteRoutes)
          .use(coursesRoutes)
          .use(accessRoutes)
          .use(testimonialsRoutes),
      ),
    )
    .onError(({ code, error, set }) => {
      if (code === 'VALIDATION') return
      const message = error instanceof Error ? error.message : String(error)
      console.error('[error]', code, message)
      set.status = 500
      return { error: 'internal', code, message }
    })
}
