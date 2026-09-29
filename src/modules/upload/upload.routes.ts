import { Elysia, t } from 'elysia'
import * as upload from './upload.service'
import { registerAsset } from '../assets/assets.service'

// Límite por parte: por debajo del tope de 100 MB de Cloudflare.
const MAX_PART = 95 * 1024 * 1024

export const uploadRoutes = new Elysia({ name: 'upload' })
  .post('/upload/init', ({ body }) => upload.initMultipart(body.key, body.contentType), {
    body: t.Object({ key: t.String(), contentType: t.Optional(t.String()) }),
  })
  .put(
    '/upload/part',
    async ({ query, request, status }) => {
      const len = Number(request.headers.get('content-length') ?? 0)
      if (len > MAX_PART) return status(413, { error: 'part too large', max: MAX_PART })
      const body = Buffer.from(await request.arrayBuffer())
      return upload.uploadPart(query.key, query.uploadId, query.partNumber, body)
    },
    {
      query: t.Object({
        key: t.String(),
        uploadId: t.String(),
        partNumber: t.Numeric(),
      }),
    },
  )
  .post(
    '/upload/complete',
    async ({ body }) => {
      await upload.completeMultipart(body.key, body.uploadId, body.parts)
      await registerAsset(body.key, { size: body.size, mime: body.contentType })
      return { ok: true, key: body.key }
    },
    {
      body: t.Object({
        key: t.String(),
        uploadId: t.String(),
        parts: t.Array(t.Object({ PartNumber: t.Number(), ETag: t.String() })),
        size: t.Optional(t.Number()),
        contentType: t.Optional(t.String()),
      }),
    },
  )
  .post(
    '/upload/abort',
    async ({ body }) => {
      await upload.abortMultipart(body.key, body.uploadId)
      return { ok: true }
    },
    { body: t.Object({ key: t.String(), uploadId: t.String() }) },
  )
