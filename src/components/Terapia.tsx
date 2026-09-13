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
    <section id="terapia" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Terapia del Caos</p>
          <h2 className="mt-5 font-display leading-[0.9] tracking-[-0.02em]">
            <span className="block text-lg uppercase tracking-[0.22em] text-muted-foreground sm:text-xl">
              El caos no es tu enemigo.
            </span>
            <span className="mt-3 block text-[clamp(3rem,9vw,6.5rem)] text-primary">Es</span>
            <span className="block text-[clamp(3rem,9vw,6.5rem)]">información.</span>
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

        <div className="lg:pt-2">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Proceso en 5 pasos
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div>
            {PASOS.map((p, i) => (
              <div key={p.n}>
                <div className="group flex items-baseline gap-5 py-4">
                  <span className="font-display text-2xl leading-none text-primary/40 transition-colors group-hover:text-primary">
                    {p.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl leading-none tracking-wide">{p.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </div>
                {i < PASOS.length - 1 && <div className="h-px bg-border/60" />}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            No es lineal perfecto. <span className="font-medium text-foreground">Es un espiral.</span> Vuelves, pero más consciente.
          </p>
        </div>
      </div>
    </section>
  )
}
