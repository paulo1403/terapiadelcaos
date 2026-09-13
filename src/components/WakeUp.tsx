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
        <div className="max-w-3xl">
          <span className="eyebrow-pill">Wake Up®</span>
          <h2 className="display mt-6 text-[clamp(2.6rem,7vw,5rem)]">Autosanación emocional</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            Proceso estructurado para transformar desde adentro.
            <span className="font-medium text-foreground">
              {' '}
              Respiración, conciencia, integración.
            </span>{' '}
            No es teoría — es práctica sostenida.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Respiración · Breathwork · Meditación · Integración · Autoconocimiento
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.title}
              className={`card-hover flex flex-col rounded-3xl border p-8 lg:p-10 ${
                tier.featured
                  ? 'border-primary/35 bg-[color-mix(in_oklch,var(--primary)_9%,var(--card))]'
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-primary">{tier.label}</p>
                {tier.featured && (
                  <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-primary-foreground">
                    Recomendado
                  </span>
                )}
              </div>
              <h3 className="display mt-6 text-3xl leading-tight">{tier.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.desc}</p>
              <span className="hairline my-7 block" />
              <ul className="flex-1 space-y-3 text-sm text-muted-foreground">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90 ${
                  tier.featured
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          ¿Dudas?{' '}
          <a
            href={WA('Hola JR, una mano para elegir mi camino en WAKE UP')}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Habla con JR
          </a>{' '}
          — te digo cuál va contigo en 2 min.
        </p>
      </div>
    </section>
  )
}
