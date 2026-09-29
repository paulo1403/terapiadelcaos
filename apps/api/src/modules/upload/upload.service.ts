import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  type CompletedPart,
} from '@aws-sdk/client-s3'
import { s3 } from '../../lib/s3'
import { env } from '../../config/env'

// Multipart proxy: el navegador manda cada parte al backend (mismo origen, sin CORS
// y sin exponer escritura a MinIO). Obligatorio para archivos >100 MB (Cloudflare).
export async function initMultipart(key: string, contentType?: string) {
  const out = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: env.S3.bucket,
      Key: key,
      ContentType: contentType,
    }),
  )
  if (!out.UploadId) throw new Error('MinIO no devolvió uploadId')
  return { key, uploadId: out.UploadId }
}

export async function uploadPart(
  key: string,
  uploadId: string,
  partNumber: number,
  body: Uint8Array,
) {
  const out = await s3.send(
    new UploadPartCommand({
      Bucket: env.S3.bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: body,
    }),
  )
  return { etag: (out.ETag ?? '').replaceAll('"', '') }
}

export async function completeMultipart(key: string, uploadId: string, parts: CompletedPart[]) {
  await s3.send(
    new CompleteMultipartUploadCommand({
      Bucket: env.S3.bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }),
  )
}

export async function abortMultipart(key: string, uploadId: string) {
  await s3.send(
    new AbortMultipartUploadCommand({ Bucket: env.S3.bucket, Key: key, UploadId: uploadId }),
  )
}
