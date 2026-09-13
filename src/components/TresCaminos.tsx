import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { WA } from '../lib/wa'

const CAMINOS = [
  {
    n: '01',
    tag: 'WAKE UP® · 4 MESES',
    title: 'Despertar una nueva relación contigo',
    desc: '16 sesiones · mentoría y comunidad. El proceso core para transformación sostenida.',
    cta: 'CONOCER WAKE UP',
    href: WA('Hola JR, me interesa WAKE UP 4 meses'),
  },
  {
    n: '02',
    tag: 'SANACIÓN',
    title: 'Una sesión. Un espacio para ti.',
    desc: 'Virtual o presencial · 1 tema concreto.',
    cta: 'RESERVAR SESIÓN',
    href: WA('Hola JR, quiero reservar Sesión de Sanación'),
  },
  {
    n: '03',
    tag: 'AYAHUASCA',
    title: 'Experiencia de despertar',
    desc: 'Respiración · integración · con evaluación previa.',
    cta: 'CONOCER EXPERIENCIA',
    href: WA('Hola JR, info Ayahuasca'),
  },
]

export function TresCaminos() {
  const [ayahuasca, setAyahuasca] = useState(false)

  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow-pill">Elige tu puerta</span>
          <h2 className="h2">
            Tres caminos.
            <br />
            Un mismo <span className="block-accent">propósito.</span>
          </h2>
          <p className="lead">
            Proceso completo, tema puntual o experiencia intensiva. Empieza donde estás.
          </p>
        </div>

        <div className="caminos grid-dim">
          {CAMINOS.map((c, i) => {
            const featured = i === 0
            const inner = (
              <>
                <div className="camino-top">
                  <span className="camino-num">{c.n}</span>
                  <span className="badge">{c.tag}</span>
                </div>
                <h3 className="camino-title">{c.title}</h3>
                <p className="camino-desc">{c.desc}</p>
                <span className="camino-cta">
                  {c.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </>
            )

            const classes = `camino card-hover${featured ? ' featured' : ''}`

            if (i === 2) {
              return (
                <button key={c.n} type="button" className={classes} onClick={() => setAyahuasca(true)}>
                  {inner}
                </button>
              )
            }

            return (
              <a key={c.n} href={c.href} target="_blank" rel="noreferrer" className={classes}>
                {inner}
              </a>
            )
          })}
        </div>

        <p className="caminos-note">Cupos limitados · recomendado para transformación sostenida.</p>
      </div>

      <Modal open={ayahuasca} onClose={() => setAyahuasca(false)} title="Evaluación previa">
        <p className="body-sm">
          Requiere cuestionario y entrevista. No es para todos.
        </p>
        <a href={CAMINOS[2].href} target="_blank" rel="noreferrer" className="btn btn-primary mt-5">
          Hablar con JR
        </a>
      </Modal>
    </section>
  )
}
