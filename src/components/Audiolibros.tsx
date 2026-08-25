import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Search, Play } from 'lucide-react'
import { HOTMART } from '../content/site'

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

  const filtered = LIBROS.filter(l => (cat === 'Todos' || l.cat === cat) && l.titulo.toLowerCase().includes(q.toLowerCase()))
  const featured = filtered.slice(0, 6)

  return (
    <section id="audiolibros" className="py-20 px-5 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-muted-foreground">21 AUDIO LIBROS DE SANACIÓN</p>
          <h2 className="font-display text-3xl lg:text-4xl mt-2">TU PROCESO TAMBIÉN PUEDE COMENZAR DESDE CASA</h2>
          <p className="text-sm text-muted-foreground mt-3">Biblioteca curada — escucha 2 min de cada uno, elige tu puerta.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar: ansiedad, duelo, límites..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {CATS.map(c => (
              <Badge key={c} variant={cat === c ? 'default' : 'outline'} className="cursor-pointer rounded-full" onClick={() => setCat(c)}>{c}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {featured.map(l => (
            <Card key={l.id} className="hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => setOpen(l)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px]">{l.cat}</Badge>
                  <span className="text-xs text-muted-foreground">{String(l.id).padStart(2,'0')}</span>
                </div>
                <CardTitle className="font-display text-base leading-tight group-hover:text-primary">{l.titulo}</CardTitle>
                <CardDescription className="text-xs">{l.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-primary"><Play className="w-3 h-3" /> Escuchar 2 min</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length > 6 && <p className="text-center text-xs text-muted-foreground mt-4">{filtered.length - 6} más en esta categoría — ajusta búsqueda</p>}

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href={HOTMART.audiobooks || '#'} target="_blank" rel="noreferrer">QUIERO LOS 21 AUDIOLIBROS — HOTMART</a>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">Acceso inmediato · escucha offline</p>
        </div>

        <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">{open?.titulo}</DialogTitle>
              <DialogDescription>{open?.cat} · {open?.desc}</DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <Play className="w-8 h-8" /> <span className="ml-2 text-sm">Preview 2 min — próximamente</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
