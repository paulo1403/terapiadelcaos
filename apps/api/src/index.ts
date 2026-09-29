import { createApp } from './app'
import { env } from './config/env'
import { db, initDb, initProgress, initTestimonials } from './lib/db'
import { syncFromBucket } from './modules/assets/assets.service'

await initDb()
await initTestimonials()
await initProgress()

const [row] = (await db`select count(*)::int as count from assets`) as unknown as {
  count: number
}[]
if (!row?.count) {
  const total = await syncFromBucket()
  console.log(`[sync] importados ${total} objetos del bucket`)
}

const app = createApp().listen(env.PORT)

console.log(`terapiadelcaos-admin escuchando en :${app.server?.port ?? env.PORT}`)
