import { getSetting, setSetting } from '../settings/settings.service'
import { DEFAULT_SITE, type SiteConfig, type SiteSection } from './site.defaults'

const KEY = 'site'

export async function getSite(): Promise<SiteConfig> {
  const stored = (await getSetting<Partial<SiteConfig>>(KEY)) ?? {}
  const storedSections = stored.sections ?? DEFAULT_SITE.sections
  const known = new Set(storedSections.map((s) => s.id))
  const sections = [
    ...storedSections,
    ...DEFAULT_SITE.sections.filter((s) => !known.has(s.id)),
  ]
  return {
    sections,
    content: { ...DEFAULT_SITE.content, ...(stored.content ?? {}) },
    labels: DEFAULT_SITE.labels,
    defaults: DEFAULT_SITE.content,
  }
}

export async function publicSite() {
  const site = await getSite()
  return {
    sections: site.sections.filter((s) => s.visible),
    content: site.content,
  }
}

export async function saveSite(input: {
  sections?: SiteSection[]
  content?: Record<string, string>
}) {
  const stored = (await getSetting<Partial<SiteConfig>>(KEY)) ?? {}
  const next = {
    sections: input.sections ?? stored.sections ?? DEFAULT_SITE.sections,
    content: { ...(stored.content ?? {}), ...(input.content ?? {}) },
  }
  await setSetting(KEY, next)
  return getSite()
}
