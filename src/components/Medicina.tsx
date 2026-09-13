import { WA } from '../lib/wa'

const PASOS = [
  { n: '01', t: 'Preparación', d: 'Intención + seguridad.' },
  { n: '02', t: 'Experiencia', d: 'Acompañado, presente.' },
  { n: '03', t: 'Integración', d: 'Lo vivido a la vida.' },
]

export function Medicina() {
  return (
    <section className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Medicina ancestral</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em]">
            Ayahuasca
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            Preparación amazónica de introspección intensa.
            <span className="font-medium text-foreground"> No es magia. No sustituye terapia.</span> Requiere preparación e integración.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {PASOS.map((p) => (
            <div key={p.n} className="bg-background p-7">
              <span className="font-display text-3xl leading-none text-primary/60">{p.n}</span>
              <p className="mt-4 font-display text-lg tracking-wide">{p.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-display text-2xl leading-snug lg:text-3xl">
          La experiencia termina. <span className="text-primary">La integración comienza.</span>
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border p-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">Responsabilidad primero</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Evalúa antecedentes médicos, psicológicos y medicamentos. No suspendas fármacos por tu cuenta. Sujeto a evaluación previa.
            </p>
          </div>
          <a
            href={WA('Hola JR, quiero información sobre criterios de seguridad para Ayahuasca.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Consultar
          </a>
        </div>
      </div>
    </section>
  )
}
