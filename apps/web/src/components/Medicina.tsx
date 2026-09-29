import { WA } from '../lib/wa'

const PASOS = [
  { n: '01', t: 'Preparación', d: 'Intención + seguridad.' },
  { n: '02', t: 'Experiencia', d: 'Acompañado, presente.' },
  { n: '03', t: 'Integración', d: 'Lo vivido a la vida.' },
]

export function Medicina() {
  return (
    <section className="section">
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow-pill">Medicina ancestral</span>
          <h2 className="display mt-6 text-[clamp(3rem,9vw,6.5rem)] text-primary">Ayahuasca</h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            Preparación amazónica de introspección intensa.
            <span className="font-medium text-foreground"> No es magia. No sustituye terapia.</span>{' '}
            Requiere preparación e integración.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PASOS.map((p) => (
            <div key={p.n} className="card-hover rounded-3xl border border-border bg-card p-8">
              <span className="display text-4xl leading-none text-primary/60">{p.n}</span>
              <p className="display mt-6 text-xl tracking-wide">{p.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="display mt-14 max-w-3xl text-3xl leading-snug lg:text-4xl">
          La experiencia termina. <span className="text-primary">La integración comienza.</span>
        </p>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">Responsabilidad primero</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Evalúa antecedentes médicos, psicológicos y medicamentos. No suspendas fármacos por tu
              cuenta. Sujeto a evaluación previa.
            </p>
          </div>
          <a
            href={WA('Hola JR, quiero información sobre criterios de seguridad para Ayahuasca.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Consultar
          </a>
        </div>
      </div>
    </section>
  )
}
