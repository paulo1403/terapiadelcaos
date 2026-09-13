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
        <div className="audio-head">
          <div className="section-head">
            <span className="eyebrow-pill">21 audiolibros</span>
            <h2 className="h2">Tu proceso desde casa</h2>
            <p className="lead">
              Escucha 2 min de cada uno. Elige tu puerta.{' '}
              <strong>Biblioteca curada por JR.</strong>
            </p>
          </div>
          <label className="search">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar: ansiedad, duelo..."
            />
          </label>
        </div>

        <div className="cats">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`cat${cat === c ? ' active' : ''}`}
            >
              {c}
            </button>
          ))}
          <span className="cats-count">{filtered.length} títulos</span>
        </div>

        {filtered.length === 0 ? (
          <p className="note">Sin resultados — prueba otra búsqueda o categoría.</p>
        ) : (
          <div className="snap-x books">
            {filtered.map((l) => (
              <button key={l.id} onClick={() => setOpen(l)} className="book">
                <div className="book-thumb">
                  <span className="book-num">{String(l.id).padStart(2, '0')}</span>
                  <span className="book-cat">{l.cat}</span>
                  <span className="book-play">
                    <span>
                      <Play className="size-3" /> Escuchar 2 min
                    </span>
                  </span>
                </div>
                <h3 className="book-title">{l.titulo}</h3>
                <p className="book-desc">{l.desc}</p>
              </button>
            ))}
          </div>
        )}

        <div className="audio-cta">
          <div>
            <p className="body-sm">
              <strong>¿Quieres los 21 completos?</strong>
            </p>
            <p className="note">Acceso inmediato · escucha offline · Hotmart</p>
          </div>
          <a
            href={HOTMART.audiobooks || WA('Hola JR, quiero los 21 audiolibros')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            QUIERO LOS 21
          </a>
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.titulo ?? ''}>
        <p className="body-sm">
          {open?.cat} · {open?.desc}
        </p>
        <div className="preview-box">
          <span className="play-circle">
            <Play className="size-5" />
          </span>
          <p className="note">Preview 2 min — próximamente</p>
        </div>
      </Modal>
    </section>
  )
}
