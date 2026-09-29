import { api, ROOT } from './api'

// Multipart: por debajo del tope de 100 MB de Cloudflare por parte.
const CHUNK = 25 * 1024 * 1024

export async function uploadFile(file: File, key: string, onProgress: (p: number) => void) {
  if (file.size === 0) throw new Error('archivo vacío')

  const { uploadId } = await api<{ uploadId: string }>('/api/upload/init', {
    body: { key, contentType: file.type || 'application/octet-stream' },
  })

  try {
    const parts: { PartNumber: number; ETag: string }[] = []
    let partNumber = 1
    for (let offset = 0; offset < file.size; offset += CHUNK, partNumber++) {
      const chunk = file.slice(offset, Math.min(offset + CHUNK, file.size))
      const query = new URLSearchParams({
        key,
        uploadId,
        partNumber: String(partNumber),
      })
      const res = await fetch(`${ROOT}/api/upload/part?${query}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/octet-stream' },
        body: chunk,
        credentials: 'include',
      })
      if (!res.ok) throw new Error(`falló la parte ${partNumber}`)
      const { etag } = (await res.json()) as { etag: string }
      parts.push({ PartNumber: partNumber, ETag: etag })
      onProgress(Math.min(1, (offset + chunk.size) / file.size))
    }
    await api('/api/upload/complete', { body: { key, uploadId, parts } })
  } catch (error) {
    await api('/api/upload/abort', { body: { key, uploadId } }).catch(() => {})
    throw error
  }
}
