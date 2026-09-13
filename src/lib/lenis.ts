import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// autoRaf: false → el loop de scroll lo maneja gsap.ticker (evita doble RAF por frame)
export const lenis = new Lenis({ autoRaf: false })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

export function scrollTo(target: string | HTMLElement, offset = -56) {
  const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement) : target
  if (!el) return
  lenis.scrollTo(el, { offset, duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
}
