import { WA } from '../lib/wa'

const PASOS = [
  { n: '01', t: 'Sentir', d: 'Volver al cuerpo.' },
  { n: '02', t: 'Comprender', d: 'Ver el patrón.' },
  { n: '03', t: 'Liberar', d: 'Soltar lo que pesa.' },
  { n: '04', t: 'Integrar', d: 'Hacerlo vida.' },
  { n: '05', t: 'Despertar', d: 'Elegir consciente.' },
]

export function Terapia() {
  return (
    <section id="terapia" className="section">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow-pill">Terapia del Caos</span>
          <h2 className="display mt-6 text-[clamp(2.8rem,8vw,6rem)]">
            <span className="block text-lg uppercase tracking-[0.22em] text-muted-foreground sm:text-xl">
              El caos no es tu enemigo.
            </span>
            <span className="mt-4 block text-primary">Es</span>
            <span className="block">información.</span>
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            Relaciones, pérdidas, crisis. Cuando todo se desordena, no siempre hay que escapar.
            <span className="font-medium text-foreground"> A veces hay que atravesarlo — con presencia.</span>
          </p>
          <p className="mt-3 max-w-xl text-xs text-muted-foreground">
            No estás solo en esto. Te acompaño a mirar el caos como proceso, no como falla.
          </p>
          <a
            href={WA('Hola JR, me interesa Terapia del Caos. Quiero atravesar mi proceso con acompañamiento.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            QUIERO ATRAVESARLO
          </a>
        </div>

        <div className="lg:pt-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Proceso en 5 pasos
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <ol className="mt-2">
            {PASOS.map((p, i) => (
              <li key={p.n}>
                <div className="group flex items-baseline gap-6 py-6">
                  <span className="display text-4xl leading-none text-primary/40 transition-colors group-hover:text-primary">
                    {p.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="display text-2xl leading-none tracking-wide lg:text-3xl">{p.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </div>
                {i < PASOS.length - 1 && <span className="hairline block" />}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-xs text-muted-foreground">
            No es un lineal perfecto. <span className="font-medium text-foreground">Es un espiral.</span>{' '}
            Vuelves, pero más consciente.
          </p>
        </div>
      </div>
    </section>
  )
}
