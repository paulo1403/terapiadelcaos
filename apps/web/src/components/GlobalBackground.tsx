import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl'

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform vec3 uBase;
uniform vec3 uAccent;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.04;
  vec2 q = uv * vec2(1.5, 2.2) + vec2(0.0, -uScroll * 0.7) + uMouse * 0.18;
  float n = fbm(q + t);
  float n2 = fbm(q * 1.7 - t * 0.6);
  float fog = smoothstep(0.2, 0.95, n * 0.7 + n2 * 0.3);
  vec3 col = mix(uBase, uAccent, fog * 0.15);
  float glow = smoothstep(1.1, 0.0, distance(uv, vec2(0.5 + uMouse.x * 0.12, 0.08)));
  col += uAccent * glow * 0.05;
  float vig = smoothstep(1.25, 0.2, length(uv - 0.5));
  col *= mix(0.88, 1.05, vig);
  gl_FragColor = vec4(col, 1.0);
}
`

const PALETTES = {
  dark: { base: [0.045, 0.045, 0.05], accent: [0.79, 0.45, 0.31] },
  light: { base: [0.97, 0.955, 0.93], accent: [0.71, 0.38, 0.25] },
}

export function GlobalBackground() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: Renderer
    try {
      renderer = new Renderer({ alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1) })
    } catch {
      return
    }
    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'
    el.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new Vec2(0, 0) },
        uBase: { value: PALETTES.dark.base },
        uAccent: { value: PALETTES.dark.accent },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    let disposed = false
    let raf = 0

    const setPalette = () => {
      const p = document.documentElement.classList.contains('dark') ? PALETTES.dark : PALETTES.light
      program.uniforms.uBase.value = p.base
      program.uniforms.uAccent.value = p.accent
    }
    const resize = () => renderer.setSize(el.clientWidth || window.innerWidth, el.clientHeight || window.innerHeight)
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      program.uniforms.uScroll.value = window.scrollY / max
    }
    const target = new Vec2(0, 0)
    const onPointer = (e: PointerEvent) => {
      target.set(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    const observer = new MutationObserver(setPalette)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    setPalette()
    resize()
    onScroll()

    let last = performance.now()
    const draw = (now: number) => {
      program.uniforms.uTime.value += Math.min((now - last) / 1000, 0.05)
      last = now
      const m = program.uniforms.uMouse.value as Vec2
      m.x += (target.x - m.x) * 0.05
      m.y += (target.y - m.y) * 0.05
      renderer.render({ scene: mesh })
    }

    if (reduced) {
      draw(performance.now())
    } else {
      const loop = (now: number) => {
        if (disposed) return
        draw(now)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      if (gl.canvas.parentNode === el) el.removeChild(gl.canvas)
    }
  }, [])

  return <div ref={host} className="global-bg" aria-hidden="true" />
}
