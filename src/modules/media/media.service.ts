import {
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3, s3Public } from '../../lib/s3'
import { env } from '../../config/env'

export type MediaObject = {
  key: string
  size: number
  modified?: Date
  etag?: string
  url?: string
}

export async function listObjects(prefix = '', cursor?: string, withUrls = false) {
  const out = await s3.send(
    new ListObjectsV2Command({
      Bucket: env.S3.bucket,
      Prefix: prefix,
      MaxKeys: 200,
      ContinuationToken: cursor,
    }),
  )
  const objects: MediaObject[] = (out.Contents ?? []).map((o) => ({
    key: o.Key ?? '',
    size: o.Size ?? 0,
    modified: o.LastModified,
    etag: o.ETag,
  }))
  if (withUrls) {
    for (const o of objects) o.url = await presignPlay(o.key, 21600)
  }
  return {
    objects,
    next: out.IsTruncated ? (out.NextContinuationToken ?? null) : null,
  }
}

// URL firmada de reproducción. Soporta Range (seek de video).
export function presignPlay(key: string, expiresIn = 3600) {
  return getSignedUrl(
    s3Public,
    new GetObjectCommand({ Bucket: env.S3.bucket, Key: key }),
    { expiresIn },
  )
}

export async function deleteObject(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: env.S3.bucket, Key: key }))
}
