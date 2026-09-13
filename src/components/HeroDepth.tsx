import { useEffect, useImperativeHandle, useRef } from 'react'
import type { Ref } from 'react'
import * as THREE from 'three'

export type HeroDepthHandle = { setProgress: (p: number) => void }

type Props = {
  src: string
  /** Intensidad del parallax (0-1). */
  strength?: number
  className?: string
  ref?: Ref<HeroDepthHandle>
}

/**
 * Hero con parallax de profundidad 2.5D en WebGL, dirigido por scroll.
 * `setProgress(0..1)` empuja la "cámara" por la niebla y renderiza un solo
 * frame por actualización (idle = 0 frames).
 */
export function HeroDepth({ src, strength = 0.16, className, ref }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const progress = useRef<(p: number) => void>(() => {})

  useImperativeHandle(ref, () => ({ setProgress: (p) => progress.current(p) }), [])

  useEffect(() => {
    const el = host.current
    if (!el) return

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
      uProgress: { value: 0 },
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
        uniform float uProgress;
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
          // cámara: zoom-in + deriva vertical según el scroll
          float zoom = 1.0 + uStrength * 1.35 + uProgress * 0.30;
          vec2 p = (uv - 0.5) * zoom + 0.5;
          vec2 offset = vec2(0.0, (0.5 - uProgress) * 0.07) * depth;
          vec2 puv = coverUv(p - offset);
          vec4 c = texture2D(tDiffuse, puv);
          float vig = smoothstep(1.35, 0.2, length((uv - 0.5) * vec2(1.0, 0.9)));
          c.rgb *= mix(0.72 + uProgress * 0.10, 1.05, vig);
          gl_FragColor = c;
        }
      `,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    // Motas atmosféricas: hacen visible la profundidad sobre la niebla.
    const COUNT = 150
    const pos = new Float32Array(COUNT * 3)
    const depthAttr = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = Math.random() * 2 - 1
      pos[i * 3 + 1] = Math.random() * 2 - 1
      depthAttr[i] = Math.random()
    }
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pointsGeo.setAttribute('aDepth', new THREE.BufferAttribute(depthAttr, 1))
    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProgress: uniforms.uProgress,
        uStrength: { value: strength * 2.4 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1) },
      },
      vertexShader: /* glsl */ `
        uniform float uProgress;
        uniform float uStrength;
        uniform float uPixelRatio;
        attribute float aDepth;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.xy += vec2(0.0, (0.5 - uProgress) * 0.14) * aDepth;
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

    let scheduled = false
    const render = () => {
      if (disposed || !renderer) return
      renderer.render(scene, camera)
    }
    const requestRender = () => {
      if (scheduled) return
      scheduled = true
      raf = requestAnimationFrame(() => {
        scheduled = false
        render()
      })
    }

    progress.current = (p) => {
      uniforms.uProgress.value = p
      requestRender()
    }

    const loader = new THREE.TextureLoader()
    loader.load(src, (tex) => {
      if (disposed) return
      tex.colorSpace = THREE.SRGBColorSpace
      uniforms.tDiffuse.value = tex
      if (tex.image?.width && tex.image?.height) {
        uniforms.uImgAspect.value = tex.image.width / tex.image.height
      }
      render()
    })

    const resize = () => {
      if (!renderer || !el) return
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      uniforms.uViewAspect.value = w / h
      render()
    }
    window.addEventListener('resize', resize)
    resize()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
