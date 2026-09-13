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
    <section id="jr" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[300px_1fr] lg:gap-20">
        <div className="flex flex-col items-start lg:sticky lg:top-28">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-card">
            <span className="font-display text-3xl text-primary">JR</span>
          </div>
          <h3 className="mt-5 font-display text-2xl">JR Rivera</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Psicólogo · Psicoterapeuta
          </p>
          <div className="mt-5 flex gap-6">
            <div>
              <p className="font-display text-2xl text-primary">12</p>
              <p className="text-[11px] text-muted-foreground">años</p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">+500</p>
              <p className="text-[11px] text-muted-foreground">procesos</p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">4.9</p>
              <p className="text-[11px] text-muted-foreground">valoración</p>
            </div>
          </div>
          <p className="mt-5 max-w-[260px] text-xs leading-relaxed text-muted-foreground">
            No te arreglo. Te acompaño a atravesar tu caos con herramientas reales.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="mt-5 text-sm font-medium text-primary underline underline-offset-4">
                Ver quién soy →
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogTitle className="font-display text-xl">Mi camino</DialogTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Mi camino no empezó en consultorio. Empezó en dolor y búsqueda. Aprendí a hacer mejores
                preguntas, no a dar respuestas.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-12">
          <div className="rounded-3xl border border-border p-8 lg:p-12">
            <div className="space-y-2 font-display text-xl leading-tight lg:text-3xl">
              {MANIFIESTO.map((m) => (
                <p key={m} className={m === 'Despierta.' ? 'text-primary' : undefined}>
                  {m}
                </p>
              ))}
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Terapia del Caos
            </p>
          </div>

          <div>
            <div className="flex items-end justify-between border-b border-border pb-3">
              <h4 className="font-display text-xl">Historias reales</h4>
              <span className="text-xs text-muted-foreground">Con autorización</span>
            </div>
            <div className="divide-y divide-border">
              {TESTIMONIOS.map((t) => (
                <div key={t.nombre} className="flex gap-4 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground">
                    {t.nombre[0]}
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-foreground/90">“{t.texto}”</p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      {t.nombre} · {t.ciudad}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-primary px-8 py-10 text-center text-primary-foreground">
            <p className="font-display text-2xl lg:text-3xl">¿Listo para comenzar?</p>
            <p className="mt-2 text-xs opacity-80">Elige tu camino o habla directo — respondo en &lt;2h</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#audiolibros"
                className="inline-flex h-11 items-center justify-center rounded-full bg-background px-6 text-sm font-medium text-foreground"
              >
                Desde casa — 21 audiolibros
              </a>
              <a
                href={WA('Hola JR, quiero empezar mi proceso.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-primary-foreground/40 px-6 text-sm font-medium"
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
