import { useEffect, useRef } from 'react'
import { Curtains, Plane } from 'curtainsjs'
import heroDesktop from '../assets/hero-immersive-desktop.png'
import heroMobile from '../assets/hero-immersive-mobile.png'

const VERTEX = `
precision mediump float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;
varying vec2 vTextureCoord;
void main() {
  vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
  gl_Position = uPMatrix * mvPosition;
  vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}
`

const FRAGMENT = `
precision mediump float;
uniform sampler2D uSampler;
uniform float uTime;
uniform float uScroll;
uniform float uIntensity;
varying vec2 vTextureCoord;
void main() {
  vec2 uv = vTextureCoord;
  float wave = sin(uv.y * 5.0 + uTime * 0.35) * cos(uv.x * 2.5 - uTime * 0.2);
  uv.x += wave * 0.004 * uIntensity;
  uv.y += (uScroll - 0.35) * 0.03 * uIntensity;
  uv = clamp(uv, 0.002, 0.998);
  gl_FragColor = texture2D(uSampler, uv);
}
`

export function HeroMedia() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse || reduced) return

    let curtains: Curtains
    try {
      curtains = new Curtains({
        container: el,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        watchScroll: true,
      })
    } catch {
      return
    }

    const img = el.querySelector('img') as HTMLImageElement | null
    if (!img) {
      curtains.dispose()
      return
    }

    const uniforms = {
      uTime: { value: 0, type: '1f' },
      uScroll: { value: 0.35, type: '1f' },
      uIntensity: { value: 0.35, type: '1f' },
    }

    const plane = new Plane(curtains, img, {
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    })

    plane.onReady(() => {
      el.classList.add('is-curtains')
    })

    let target = 0.35
    let started = performance.now()

    curtains.onScroll(() => {
      const hero = el.closest('.hero') as HTMLElement | null
      const max = hero ? Math.max(1, hero.offsetHeight - window.innerHeight) : 1
      target = Math.min(1, Math.max(0, window.scrollY / max))
    })

    plane.onRender(() => {
      uniforms.uTime.value = (performance.now() - started) / 1000
      uniforms.uScroll.value += (target - uniforms.uScroll.value) * 0.05
    })

    return () => {
      started = 0
      try {
        plane.remove()
      } catch {
        /* noop */
      }
      try {
        curtains.dispose()
      } catch {
        /* noop */
      }
    }
  }, [])

  return (
    <div ref={host} className="hero-media-host">
      <picture>
        <source media="(max-width: 767px)" srcSet={heroMobile} />
        <img src={heroDesktop} alt="" aria-hidden="true" className="hero-media" />
      </picture>
    </div>
  )
}
