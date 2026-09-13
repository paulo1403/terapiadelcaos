import { useState } from 'react'
import { Search, Play } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { HOTMART } from '../content/site'
import { WA } from '../lib/wa'

type Libro = { id: number; titulo: string; cat: string; desc: string }

const LIBROS: Libro[] = [
  { id: 1, titulo: 'El arte de sentir', cat: 'Emociones', desc: 'Volver al cuerpo y nombrar lo que sientes.' },
  { id: 2, titulo: 'Habitación del silencio', cat: 'Presencia', desc: 'Práctica de silencio y escucha interior.' },
  { id: 3, titulo: 'Carta a mi dolor', cat: 'Duelo', desc: 'Escribir para integrar la pérdida.' },
  { id: 4, titulo: 'Respira y suelta', cat: 'Respiración', desc: 'Breathwork para liberar tensión.' },
  { id: 5, titulo: 'El cuerpo recuerda', cat: 'Trauma', desc: 'Memoria corporal y regulación.' },
  { id: 6, titulo: 'Voces internas', cat: 'Creencias', desc: 'Observar el diálogo interno.' },
  { id: 7, titulo: 'Cicatrices luminosas', cat: 'Duelo', desc: 'Transformar herida en recurso.' },
  { id: 8, titulo: 'El permiso de soltar', cat: 'Límites', desc: 'Soltar lo que ya no sostienes.' },
  { id: 9, titulo: 'Donde nace la calma', cat: 'Ansiedad', desc: 'Anclajes para la ansiedad.' },
  { id: 10, titulo: 'Diálogo con el miedo', cat: 'Miedo', desc: 'Conversar con el miedo, no huir.' },
  { id: 11, titulo: 'El peso de los debería', cat: 'Creencias', desc: 'Cuestionar mandatos internos.' },
  { id: 12, titulo: 'Sanar sin prisa', cat: 'Proceso', desc: 'Ritmo propio y paciencia.' },
  { id: 13, titulo: 'Raíces y alas', cat: 'Familia', desc: 'Vínculos y autonomía.' },
  { id: 14, titulo: 'La noche que enseña', cat: 'Crisis', desc: 'Crisis como umbral.' },
  { id: 15, titulo: 'Cuidar al niño interior', cat: 'Vínculo', desc: 'Reparenting y ternura.' },
  { id: 16, titulo: 'Fronteras sagradas', cat: 'Límites', desc: 'Límites como acto de amor.' },
  { id: 17, titulo: 'Abrazar la incertidumbre', cat: 'Ansiedad', desc: 'Habitar lo incierto.' },
  { id: 18, titulo: 'El lenguaje de las lágrimas', cat: 'Emociones', desc: 'Permitir el llanto.' },
  { id: 19, titulo: 'Vuelvo a mí', cat: 'Identidad', desc: 'Regreso al centro.' },
  { id: 20, titulo: 'Despertar cotidiano', cat: 'Presencia', desc: 'Prácticas diarias.' },
  { id: 21, titulo: 'El caos fecundo', cat: 'Caos', desc: 'Caos como fertilidad.' },
]

const CATS = ['Todos', 'Emociones', 'Ansiedad', 'Duelo', 'Límites', 'Presencia']

export function Audiolibros() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todos')
  const [open, setOpen] = useState<Libro | null>(null)
  const filtered = LIBROS.filter(
    (l) =>
      (cat === 'Todos' || l.cat === cat) &&
      (l.titulo.toLowerCase().includes(q.toLowerCase()) ||
        l.cat.toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <section id="audiolibros" className="section">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow-pill">21 audiolibros</span>
            <h2 className="display mt-6 text-[clamp(2.4rem,6vw,4.5rem)]">Tu proceso desde casa</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Escucha 2 min de cada uno. Elige tu puerta.{' '}
              <span className="font-medium text-foreground">Biblioteca curada por JR.</span>
            </p>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar: ansiedad, duelo..."
              className="h-12 w-full rounded-full border border-border bg-transparent pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`-mb-px border-b-2 pb-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                cat === c
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto pb-2 text-xs text-muted-foreground">{filtered.length} títulos</span>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Sin resultados — prueba otra búsqueda o categoría.
          </p>
        ) : (
          <div className="snap-x mt-10 pb-2">
            {filtered.map((l) => (
              <button
                key={l.id}
                onClick={() => setOpen(l)}
                className="group w-[78%] text-left sm:w-[46%] lg:w-[31%]"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-border bg-card transition-colors group-hover:border-primary/40">
                  <span className="display text-7xl text-foreground/10 transition-colors group-hover:text-primary/30">
                    {String(l.id).padStart(2, '0')}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                      <Play className="size-3" /> Escuchar 2 min
                    </span>
                  </span>
                  <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {l.cat}
                  </span>
                </div>
                <h3 className="display mt-4 text-xl leading-tight transition-colors group-hover:text-primary">
                  {l.titulo}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{l.desc}</p>
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-border p-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium">¿Quieres los 21 completos?</p>
            <p className="text-xs text-muted-foreground">Acceso inmediato · escucha offline · Hotmart</p>
          </div>
          <a
            href={HOTMART.audiobooks || WA('Hola JR, quiero los 21 audiolibros')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            QUIERO LOS 21
          </a>
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.titulo ?? ''}>
        <p className="text-sm text-muted-foreground">
          {open?.cat} · {open?.desc}
        </p>
        <div className="mt-4 flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-border">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="ml-0.5 size-5" />
          </div>
          <p className="text-sm text-muted-foreground">Preview 2 min — próximamente</p>
        </div>
      </Modal>
    </section>
  )
}
