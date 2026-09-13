import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { WA } from '../lib/wa'

const CAMINOS = [
  {
    n: '01',
    tag: 'WAKE UP® · 4 MESES',
    title: 'Despertar una nueva relación contigo',
    desc: '16 sesiones · mentoría y comunidad. El proceso core.',
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
    desc: 'Respiración · integración · con evaluación.',
    cta: 'CONOCER EXPERIENCIA',
    href: WA('Hola JR, info Ayahuasca'),
  },
]

export function TresCaminos() {
  return (
    <section className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Elige tu puerta</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.01em]">
            Tres caminos. Un mismo propósito.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Proceso completo, tema puntual o experiencia intensiva. Empieza donde estás.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {CAMINOS.map((c, i) => (
            <div
              key={c.n}
              className={`flex flex-col p-8 lg:p-10 ${i === 0 ? 'bg-card' : 'bg-background'}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl leading-none text-primary/50">{c.n}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight lg:text-[1.75rem]">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-8">
                {i === 2 ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm font-medium text-primary underline underline-offset-4 transition-opacity hover:opacity-80">
                        {c.cta} →
                      </button>
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
                ) : (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80 ${
                      i === 0 ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {c.cta} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Cupos limitados · recomendado para transformación sostenida.
        </p>
      </div>
    </section>
  )
}
