import { Elysia, t } from 'elysia'
import { getProfile, saveAdmin, saveAvatar } from './settings.service'

const MAX_AVATAR = 8 * 1024 * 1024

export const settingsRoutes = new Elysia({ name: 'settings' })
  .get('/settings/profile', () => getProfile())
  .put(
    '/settings/profile',
    async ({ body }) => {
      await saveAdmin({ username: body.username })
      return getProfile()
    },
    { body: t.Object({ username: t.String({ minLength: 1 }) }) },
  )
  .put('/settings/avatar', async ({ request, status }) => {
    const contentType = request.headers.get('content-type') ?? 'image/jpeg'
    const bytes = Buffer.from(await request.arrayBuffer())
    if (!bytes.length) return status(400, { error: 'empty' })
    if (bytes.length > MAX_AVATAR) return status(413, { error: 'too large', max: MAX_AVATAR })
    return saveAvatar(bytes, contentType)
  })
