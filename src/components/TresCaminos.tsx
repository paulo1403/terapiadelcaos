import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
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
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow-pill">Elige tu puerta</span>
          <h2 className="display mt-6 text-[clamp(2.4rem,6vw,4.5rem)]">
            Tres caminos.
            <br />
            Un mismo <span className="text-primary">propósito.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Proceso completo, tema puntual o experiencia intensiva. Empieza donde estás.
          </p>
        </div>

        <div className="grid-dim mt-14 grid gap-4 md:grid-cols-[1.35fr_1fr]">
          {CAMINOS.map((c, i) => {
            const featured = i === 0
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="display text-5xl text-primary/45">{c.n}</span>
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {c.tag}
                  </span>
                </div>
                <h3 className="display mt-8 text-3xl leading-tight">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <span
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-medium ${
                    featured ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {c.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </>
            )

            const classes = `card-hover flex flex-col rounded-3xl border p-8 lg:p-10 ${
              featured
                ? 'border-primary/25 bg-[color-mix(in_oklch,var(--primary)_8%,var(--card))] md:row-span-2'
                : 'border-border bg-card'
            }`

            if (i === 2) {
              return (
                <Dialog key={c.n}>
                  <DialogTrigger asChild>
                    <button className={`${classes} text-left`}>{inner}</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="font-display">Evaluación previa</DialogTitle>
                    <DialogDescription className="text-sm">
                      Requiere cuestionario y entrevista. No es para todos.
                    </DialogDescription>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
                    >
                      Hablar con JR
                    </a>
                  </DialogContent>
                </Dialog>
              )
            }

            return (
              <a
                key={c.n}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={classes}
              >
                {inner}
              </a>
            )
          })}
        </div>

        <p className="mt-6 text-xs tracking-wide text-muted-foreground">
          Cupos limitados · recomendado para transformación sostenida.
        </p>
      </div>
    </section>
  )
}
