import { unlink } from 'node:fs/promises'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { db } from '../../lib/db'
import { s3 } from '../../lib/s3'
import { env } from '../../config/env'
import { presignPlay } from '../media/media.service'

async function run(cmd: string[]) {
  const proc = Bun.spawn(cmd, { stdout: 'ignore', stderr: 'ignore' })
  const code = await proc.exited
  if (code !== 0) throw new Error(`comando falló (${code}): ${cmd[0]}`)
}

async function upload(key: string, path: string, contentType: string) {
  const body = Buffer.from(await Bun.file(path).arrayBuffer())
  await s3.send(
    new PutObjectCommand({ Bucket: env.S3.bucket, Key: key, Body: body, ContentType: contentType }),
  )
}

/** Poster (WebP 1280) + versión web 720p. Original intacto. */
export async function processTestimonial(id: number) {
  const [row] = (await db`
    select t.id, a.key from testimonials t join assets a on a.id = t.asset_id where t.id = ${id}
  `) as unknown as { id: number; key: string }[]
  if (!row) return

  await db`update testimonials set status = 'processing' where id = ${id}`
  const poster = `/tmp/tposter_${id}.webp`
  const web = `/tmp/tweb_${id}.mp4`

  try {
    const url = await presignPlay(row.key, 3600)
    await run(['ffmpeg', '-y', '-ss', '1', '-i', url, '-frames:v', '1', '-vf', 'scale=1280:-2', poster])
    await run([
      'ffmpeg', '-y', '-i', url,
      '-vf', 'scale=-2:720',
      '-c:v', 'libx264', '-crf', '26', '-preset', 'veryfast',
      '-c:a', 'aac', '-b:a', '96k',
      '-movflags', '+faststart',
      web,
    ])
    const posterKey = `thumbs/testimonios/${id}.webp`
    const webKey = `web/testimonios/${id}.mp4`
    await upload(posterKey, poster, 'image/webp')
    await upload(webKey, web, 'video/mp4')
    await db`
      update testimonials set poster_key = ${posterKey}, web_key = ${webKey}, status = 'ready'
      where id = ${id}
    `
  } catch (error) {
    console.error('[testimonial] fallo procesando', id, error)
    await db`update testimonials set status = 'error' where id = ${id}`
  } finally {
    await unlink(poster).catch(() => {})
    await unlink(web).catch(() => {})
  }
}
