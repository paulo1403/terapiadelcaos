import { S3Client } from '@aws-sdk/client-s3'
import { env } from '../config/env'

const credentials = {
  accessKeyId: env.S3.accessKeyId,
  secretAccessKey: env.S3.secretAccessKey,
}

// Operaciones reales (list/put/multipart/delete): red interna Tailscale al MinIO.
export const s3 = new S3Client({
  region: env.S3.region,
  endpoint: env.S3.endpointInternal,
  forcePathStyle: true,
  credentials,
})

// Firma de URLs de reproducción: endpoint público, para que abran desde el navegador.
export const s3Public = new S3Client({
  region: env.S3.region,
  endpoint: env.S3.endpoint,
  forcePathStyle: true,
  credentials,
})
