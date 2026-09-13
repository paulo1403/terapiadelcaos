import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { WA } from '../lib/wa'

const TESTIMONIOS = [
  { nombre: 'María G.', ciudad: 'Lima — WAKE UP', texto: 'No me “curaron”, me enseñaron a sostenerme. Hoy duermo, pongo límites y sigo en tribu.' },
  { nombre: 'Jorge C.', ciudad: 'Trujillo — Sesión', texto: 'Una sola sesión me dio más claridad que meses dando vueltas. Me ayudó a ver qué repetía.' },
  { nombre: 'Ana L.', ciudad: 'Piura — Despertar', texto: 'Intenso, sí. Lo valioso fue la integración de después. Sin eso, es solo una noche.' },
]

const MANIFIESTO = ['No huyas de lo que sientes.', 'Escucha.', 'Respira.', 'Observa.', 'Comprende.', 'Integra.', 'Despierta.']

export function JR() {
  const [quien, setQuien] = useState(false)

  return (
    <section id="jr" className="section">
      <div className="shell jr">
        <div className="jr-profile">
          <div className="jr-avatar">JR</div>
          <h3 className="jr-name">JR Rivera</h3>
          <p className="jr-role">Psicólogo · Psicoterapeuta</p>
          <div className="hero-stats jr-stats">
            <div className="hero-stat">
              <dt>12</dt>
              <dd>años</dd>
            </div>
            <div className="hero-stat">
              <dt>+500</dt>
              <dd>procesos</dd>
            </div>
            <div className="hero-stat">
              <dt>4.9</dt>
              <dd>valoración</dd>
            </div>
          </div>
          <p className="jr-bio">
            No te arreglo. Te acompaño a atravesar tu caos con herramientas reales.
          </p>
          <button type="button" onClick={() => setQuien(true)} className="jr-link">
            Ver quién soy →
          </button>
        </div>

        <div className="jr-col">
          <div className="manifesto">
            <div>
              {MANIFIESTO.map((m) => (
                <p key={m} className={m === 'Despierta.' ? 'block-accent' : undefined}>
                  {m}
                </p>
              ))}
            </div>
            <p className="manifesto-tag">Terapia del Caos</p>
          </div>

          <div>
            <div className="testimonios-head">
              <h4>Historias reales</h4>
              <span className="note">Con autorización</span>
            </div>
            <div className="testimonios">
              {TESTIMONIOS.map((t) => (
                <figure key={t.nombre} className="testimonio card-hover">
                  <blockquote>“{t.texto}”</blockquote>
                  <figcaption>
                    <span className="ini">{t.nombre[0]}</span>
                    <span className="who">
                      {t.nombre} · {t.ciudad}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="jr-cta">
            <p className="t">¿Listo para comenzar?</p>
            <p className="s">Elige tu camino o habla directo — respondo en &lt;2h</p>
            <div className="jr-cta-actions">
              <a href="#audiolibros" className="btn btn-light">
                Desde casa — 21 audiolibros
              </a>
              <a
                href={WA('Hola JR, quiero empezar mi proceso.')}
                target="_blank"
                rel="noreferrer"
                className="btn btn-hollow"
              >
                Hablar con JR
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal open={quien} onClose={() => setQuien(false)} title="Mi camino">
        <p className="body-sm">
          Mi camino no empezó en consultorio. Empezó en dolor y búsqueda. Aprendí a hacer mejores
          preguntas, no a dar respuestas.
        </p>
      </Modal>
    </section>
  )
}
