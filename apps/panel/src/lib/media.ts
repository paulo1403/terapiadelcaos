export type MediaObject = {
  key: string
  size: number
  modified?: string
  url?: string
}

export type Asset = {
  id: string
  key: string
  title: string | null
  size: string
  mime: string | null
  created_at: string
  url?: string
}

export const isImage = (key: string) => /\.(jpe?g|png|webp|avif|gif|heic)$/i.test(key)
export const isVideo = (key: string) => /\.(mp4|mov|webm|m4v)$/i.test(key)

export const baseName = (key: string) => decodeURIComponent(key.split('/').pop() ?? key)

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let i = 0
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024
    i++
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`
}
