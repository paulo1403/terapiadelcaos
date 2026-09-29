export function scrollTo(target: string | HTMLElement, offset = -56) {
  const el =
    typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}
