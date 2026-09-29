import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { WA } from '../lib/wa'

const TESTIMONIOS = [
  { nombre: 'María G.', ciudad: 'Lima — WAKE UP', texto: 'No me “curaron”, me enseñaron a sostenerme. Hoy duermo, pongo límites y sigo en tribu.' },
  { nombre: 'Jorge C.', ciudad: 'Trujillo — Sesión', texto: 'Una sola sesión me dio más claridad que meses dando vueltas. Me ayudó a ver qué repetía.' },
  { nombre: 'Ana L.', ciudad: 'Piura — Despertar', texto: 'Intenso, sí. Lo valioso fue la integración de después. Sin eso, es solo una noche.' },
]

const MANIFIESTO = ['No huyas de lo que sientes.', 'Escucha.', 'Respira.', 'Observa.', 'Comprende.', 'Integra.', 'Despierta.']

export function JR() {
  return (
    <section id="jr" className="section">
      <div className="shell grid gap-14 lg:grid-cols-[320px_1fr] lg:gap-20">
        <div className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">
          <div className="flex size-24 items-center justify-center rounded-full border border-primary/30 bg-card">
            <span className="display text-3xl text-primary">JR</span>
          </div>
          <h3 className="display mt-6 text-3xl">JR Rivera</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Psicólogo · Psicoterapeuta
          </p>
          <div className="hero-stats mt-7 w-full max-w-[260px]">
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
          <p className="mt-6 max-w-[260px] text-xs leading-relaxed text-muted-foreground">
            No te arreglo. Te acompaño a atravesar tu caos con herramientas reales.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="mt-6 text-sm font-medium text-primary underline underline-offset-4">
                Ver quién soy →
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogTitle className="font-display text-xl">Mi camino</DialogTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Mi camino no empezó en consultorio. Empezó en dolor y búsqueda. Aprendí a hacer
                mejores preguntas, no a dar respuestas.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-14">
          <div className="rounded-3xl border border-border bg-card p-8 lg:p-14">
            <div className="display space-y-1 text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05]">
              {MANIFIESTO.map((m) => (
                <p key={m} className={m === 'Despierta.' ? 'text-primary' : undefined}>
                  {m}
                </p>
              ))}
            </div>
            <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Terapia del Caos
            </p>
          </div>

          <div>
            <div className="flex items-end justify-between border-b border-border pb-4">
              <h4 className="display text-2xl">Historias reales</h4>
              <span className="text-xs text-muted-foreground">Con autorización</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {TESTIMONIOS.map((t) => (
                <figure key={t.nombre} className="card-hover rounded-3xl border border-border bg-card p-6">
                  <blockquote className="text-sm leading-relaxed text-foreground/90">
                    “{t.texto}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
                      {t.nombre[0]}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {t.nombre} · {t.ciudad}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-primary px-8 py-12 text-center text-primary-foreground">
            <p className="display text-3xl lg:text-4xl">¿Listo para comenzar?</p>
            <p className="mt-2 text-xs opacity-80">Elige tu camino o habla directo — respondo en &lt;2h</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#audiolibros"
                className="inline-flex h-12 items-center justify-center rounded-full bg-background px-6 text-sm font-medium text-foreground"
              >
                Desde casa — 21 audiolibros
              </a>
              <a
                href={WA('Hola JR, quiero empezar mi proceso.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/40 px-6 text-sm font-medium"
              >
                Hablar con JR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
