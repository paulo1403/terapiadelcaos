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
    <section id="wakeup" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Wake Up®</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.02em]">
            Autosanación emocional
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            Proceso estructurado para transformar desde adentro.
            <span className="font-medium text-foreground"> Respiración, conciencia, integración.</span> No es teoría — es práctica sostenida.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Respiración · Breathwork · Meditación · Integración · Autoconocimiento
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.title}
              className={`flex flex-col p-8 lg:p-10 ${tier.featured ? 'bg-card' : 'bg-background'}`}
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-primary">{tier.label}</p>
              <h3 className="mt-5 font-display text-2xl leading-tight">{tier.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tier.desc}</p>
              <div className="my-6 h-px bg-border" />
              <ul className="flex-1 space-y-2.5 text-sm text-muted-foreground">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="text-primary">·</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90 ${
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

        <p className="mt-5 text-xs text-muted-foreground">
          ¿Dudas?{' '}
          <a href={WA('Hola JR, una mano para elegir mi camino en WAKE UP')} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
            Habla con JR
          </a>{' '}
          — te digo cuál va contigo en 2 min.
        </p>
      </div>
    </section>
  )
}
