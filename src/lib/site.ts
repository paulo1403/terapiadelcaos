import { useEffect, useState } from 'react'

export type SiteSection = { id: string; label: string; visible: boolean }
export type SiteData = { sections: SiteSection[]; content: Record<string, string> }

export const DEFAULT_SECTIONS: SiteSection[] = [
  { id: 'hero', label: 'Inicio', visible: true },
  { id: 'tresCaminos', label: 'Tres caminos', visible: true },
  { id: 'quiz', label: 'Quiz', visible: true },
  { id: 'terapia', label: 'Terapia del Caos', visible: true },
  { id: 'wakeup', label: 'WAKE UP', visible: true },
  { id: 'cursos', label: 'Cursos', visible: true },
  { id: 'audiolibros', label: 'Audiolibros', visible: true },
  { id: 'despertares', label: 'Despertares', visible: true },
  { id: 'medicina', label: 'Medicina ancestral', visible: true },
  { id: 'testimonios', label: 'Testimonios', visible: true },
  { id: 'jr', label: 'JR Rivera', visible: true },
]

let cache: SiteData | null = null
let inflight: Promise<SiteData> | null = null

export function fetchSite(): Promise<SiteData> {
  if (cache) return Promise.resolve(cache)
  if (!inflight) {
    inflight = fetch('/api/site')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('site'))))
      .then((data: SiteData) => {
        cache = data
        return data
      })
      .catch(() => {
        const fallback = { sections: DEFAULT_SECTIONS, content: {} }
        cache = fallback
        return fallback
      })
  }
  return inflight
}

export function useSite() {
  const [data, setData] = useState<SiteData | null>(cache)
  useEffect(() => {
    let active = true
    fetchSite().then((d) => active && setData(d))
    return () => {
      active = false
    }
  }, [])
  return {
    sections: data?.sections ?? DEFAULT_SECTIONS,
    content: data?.content ?? {},
  }
}
