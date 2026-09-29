import { PutObjectCommand } from '@aws-sdk/client-s3'
import { db } from '../../lib/db'
import { s3 } from '../../lib/s3'
import { env } from '../../config/env'
import { presignPlay } from '../media/media.service'

export type AdminSettings = {
  username?: string
  password_hash?: string
  avatar_key?: string
}

const ADMIN = 'admin'

export async function getSetting<T>(key: string): Promise<T | null> {
  const [row] = (await db`select value from settings where key = ${key}`) as unknown as {
    value: unknown
  }[]
  if (!row) return null
  const value = row.value
  return (typeof value === 'string' ? JSON.parse(value) : value) as T
}

export async function setSetting(key: string, value: unknown) {
  const json = JSON.stringify(value)
  await db`
    insert into settings (key, value, updated_at) values (${key}, ${json}::jsonb, now())
    on conflict (key) do update set value = ${json}::jsonb, updated_at = now()
  `
}

export async function getAdmin() {
  const stored = (await getSetting<AdminSettings>(ADMIN)) ?? {}
  return {
    username: stored.username ?? env.ADMIN_USERNAME,
    passwordHash: stored.password_hash ?? env.ADMIN_PASSWORD_HASH,
    avatarKey: stored.avatar_key,
  }
}

export async function saveAdmin(patch: AdminSettings) {
  const stored = (await getSetting<AdminSettings>(ADMIN)) ?? {}
  await setSetting(ADMIN, { ...stored, ...patch })
}

export async function getProfile() {
  const admin = await getAdmin()
  return {
    username: admin.username,
    avatarUrl: admin.avatarKey ? await presignPlay(admin.avatarKey, 21600) : null,
  }
}

const EXT: Record<string, string> = {
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
}

export async function saveAvatar(bytes: Buffer, contentType: string) {
  const ext = EXT[contentType] ?? 'jpg'
  const key = `profile/avatar-${Date.now()}.${ext}`
  await s3.send(
    new PutObjectCommand({
      Bucket: env.S3.bucket,
      Key: key,
      Body: bytes,
      ContentType: contentType,
    }),
  )
  await saveAdmin({ avatar_key: key })
  return getProfile()
}
