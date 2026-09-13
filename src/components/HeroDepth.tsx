import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  src: string
  /** Intensidad del parallax (0-1). */
  strength?: number
  className?: string
}

/**
 * Hero con parallax de profundidad 2.5D en WebGL.
 * Usa la imagen como textura y un "depth" procedural (abajo = cerca, arriba = lejos,
 * modulado por luminancia) para desplazar los píxeles según el mouse. La neblina y el
 * primer plano ganan volumen sin necesitar un mapa de profundidad real.
 */
export function HeroDepth({ src, strength = 0.16, className }: Props) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer | null = null
    let raf = 0
    let disposed = false

    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'default' })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      tDiffuse: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uStrength: { value: strength },
      uImgAspect: { value: 1.5 },
      uViewAspect: { value: 1.5 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D tDiffuse;
        uniform vec2 uMouse;
        uniform float uTime;
        uniform float uStrength;
        uniform float uImgAspect;
        uniform float uViewAspect;
        varying vec2 vUv;

        vec2 coverUv(vec2 uv) {
          vec2 s = (uViewAspect > uImgAspect)
            ? vec2(1.0, uImgAspect / uViewAspect)
            : vec2(uViewAspect / uImgAspect, 1.0);
          return (uv - 0.5) * s + 0.5;
        }

        void main() {
          vec2 uv = vUv;
          vec2 base = coverUv(uv);
          float lum = dot(texture2D(tDiffuse, base).rgb, vec3(0.299, 0.587, 0.114));
          // profundidad: fondo (arriba/niebla) lejos, primer plano (abajo) cerca
          float depth = clamp(0.9 - uv.y * 0.95 + (1.0 - lum) * 0.3, 0.0, 1.0);
          // overscan para que el desplazamiento no muestre bordes
          float zoom = 1.0 + uStrength * 1.35;
          vec2 p = (uv - 0.5) * zoom + 0.5;
          vec2 offset = uMouse * uStrength * (depth - 0.4);
          offset += vec2(sin(uTime * 0.12), cos(uTime * 0.09)) * 0.006 * depth;
          vec2 puv = coverUv(p - offset);
          vec4 c = texture2D(tDiffuse, puv);
          float vig = smoothstep(1.35, 0.2, length((uv - 0.5) * vec2(1.0, 0.9)));
          c.rgb *= mix(0.72, 1.05, vig);
          gl_FragColor = c;
        }
      `,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    // Motas atmosféricas: hacen visible el parallax (la foto es neblina uniforme).
    const COUNT = 150
    const pos = new Float32Array(COUNT * 3)
    const depthAttr = new Float32Array(COUNT)
    const seedAttr = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = Math.random() * 2 - 1
      pos[i * 3 + 1] = Math.random() * 2 - 1
      depthAttr[i] = Math.random()
      seedAttr[i] = Math.random()
    }
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pointsGeo.setAttribute('aDepth', new THREE.BufferAttribute(depthAttr, 1))
    pointsGeo.setAttribute('aSeed', new THREE.BufferAttribute(seedAttr, 1))
    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMouse: uniforms.uMouse,
        uTime: uniforms.uTime,
        uStrength: { value: strength * 2.4 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1) },
      },
      vertexShader: /* glsl */ `
        uniform vec2 uMouse;
        uniform float uTime;
        uniform float uStrength;
        uniform float uPixelRatio;
        attribute float aDepth;
        attribute float aSeed;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.1 + aSeed * 6.283) * 0.02;
          p.y += cos(uTime * 0.08 + aSeed * 6.283) * 0.02;
          p.xy += uMouse * uStrength * (aDepth);
          gl_Position = vec4(p.xy, 0.0, 1.0);
          gl_PointSize = (1.5 + aDepth * 3.5) * uPixelRatio;
          vAlpha = 0.12 + aDepth * 0.38;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = smoothstep(0.5, 0.0, length(c));
          gl_FragColor = vec4(vec3(0.95, 0.92, 0.87), d * vAlpha);
        }
      `,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    scene.add(points)

    const loader = new THREE.TextureLoader()
    loader.load(src, (tex) => {
      if (disposed) return
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.tDiffuse.value = tex
      if (tex.image?.width && tex.image?.height) {
        uniforms.uImgAspect.value = tex.image.width / tex.image.height
      }
      renderer?.render(scene, camera)
    })

    // Render bajo demanda: un frame por movimiento, con amortiguación breve que
    // se detiene al converger. Sin loop perpetuo → idle = 0 frames.
    let visible = true
    let scheduled = false
    let running = false
    let last = 0

    const target = new THREE.Vector2(0, 0)

    const render = () => {
      if (disposed || !renderer) return
      renderer.render(scene, camera)
    }

    const tick = () => {
      scheduled = false
      if (!renderer || !visible) {
        running = false
        return
      }
      const now = performance.now()
      uniforms.uTime.value += Math.min((now - last) / 1000, 0.05)
      last = now
      uniforms.uMouse.value.lerp(target, 0.06)
      renderer.render(scene, camera)
      if (uniforms.uMouse.value.distanceToSquared(target) > 1e-6) {
        scheduled = true
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const requestRender = () => {
      if (scheduled || !visible) return
      if (!running) {
        last = performance.now()
        running = true
      }
      scheduled = true
      raf = requestAnimationFrame(tick)
    }

    const onPointer = (e: PointerEvent) => {
      if (!visible) return
      const r = el.getBoundingClientRect()
      target.set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2)
      requestRender()
    }

    const resize = () => {
      if (!renderer || !el) return
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      uniforms.uViewAspect.value = w / h
      render()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) requestRender()
      },
      { threshold: 0 },
    )

    if (!reduced) {
      window.addEventListener('resize', resize)
      window.addEventListener('pointermove', onPointer, { passive: true })
      io.observe(el)
      resize()
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      material.dispose()
      mesh.geometry.dispose()
      pointsMat.dispose()
      pointsGeo.dispose()
      uniforms.tDiffuse.value?.dispose()
      renderer?.dispose()
      if (renderer?.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [src, strength])

  return <div ref={host} className={className} aria-hidden="true" />
}
