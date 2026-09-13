import { HOTMART } from '../content/site'
import { WA } from '../lib/wa'

const TIERS = [
  {
    label: 'Entrada',
    title: 'WAKE UP LIGHT',
    desc: 'Puerta de entrada. Primeras herramientas.',
    bullets: ['Respiración · Psicoeducación', 'Autoconocimiento base', 'Acceso grabado'],
    cta: 'CONOCER LIGHT',
    href: HOTMART.wakeup || WA('Hola JR, me interesa WAKE UP LIGHT. ¿Cómo inicio?'),
    featured: false,
  },
  {
    label: 'Proceso core · recomendado',
    title: 'WAKE UP MENTORÍA',
    desc: '4 meses · 16 sesiones · 24/7 · comunidad.',
    bullets: ['16 sesiones + mentoría', 'Comunidad privada', 'Prácticas + integración', 'Seguimiento continuo'],
    cta: 'QUIERO MENTORÍA',
    href: HOTMART.mentoria || WA('Hola JR, quiero entrar a WAKE UP Mentoría (4 meses). ¿Próximo grupo?'),
    featured: true,
  },
  {
    label: 'Acompañamiento',
    title: 'WAKE UP PRIME',
    desc: 'Proceso profundo 1:1 con JR.',
    bullets: ['Acompañamiento individual', 'Trabajo personalizado', 'Integración profunda'],
    cta: 'QUIERO INFORMACIÓN',
    href: WA('Hola JR, me interesa WAKE UP PRIME. ¿Disponibilidad?'),
    featured: false,
  },
]

export function WakeUp() {
  return (
    <section id="wakeup" className="section">
      <div className="shell">
        <div className="section-head-wide">
          <span className="eyebrow-pill">Wake Up®</span>
          <h2 className="h2 h2-big">Autosanación emocional</h2>
          <p className="lead">
            Proceso estructurado para transformar desde adentro.{' '}
            <strong>Respiración, conciencia, integración.</strong> No es teoría — es práctica
            sostenida.
          </p>
          <p className="tags">Respiración · Breathwork · Meditación · Integración · Autoconocimiento</p>
        </div>

        <div className="tiers">
          {TIERS.map((tier) => (
            <div key={tier.title} className={`tier card-hover${tier.featured ? ' featured' : ''}`}>
              <div className="tier-head">
                <p className="tier-label">{tier.label}</p>
                {tier.featured && <span className="tier-badge">Recomendado</span>}
              </div>
              <h3 className="tier-title">{tier.title}</h3>
              <p className="tier-desc">{tier.desc}</p>
              <span className="hairline" />
              <ul className="tier-bullets">
                {tier.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a
                href={tier.href}
                target="_blank"
                rel="noreferrer"
                className={`tier-cta ${tier.featured ? 'primary' : 'outline'}`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="note">
          ¿Dudas?{' '}
          <a
            href={WA('Hola JR, una mano para elegir mi camino en WAKE UP')}
            target="_blank"
            rel="noreferrer"
            className="accent underline"
          >
            Habla con JR
          </a>{' '}
          — te digo cuál va contigo en 2 min.
        </p>
      </div>
    </section>
  )
}
