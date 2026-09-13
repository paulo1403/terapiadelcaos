import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useSite } from '../lib/site'

type Testimonio = {
  id: number
  title: string
  quote: string
  author: string
  posterUrl: string | null
  videoUrl: string | null
}

export function Testimonios() {
  const { content } = useSite()
  const [items, setItems] = useState<Testimonio[] | null>(null)
  const [open, setOpen] = useState<Testimonio | null>(null)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  if (items && items.length === 0) return null

  return (
    <section id="testimonios" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Testimonios</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.02em]">
            {content['testimonios.title'] ?? 'Historias reales'}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {content['testimonios.lead'] ??
              'Resultados y testimonios de procesos reales, con autorización.'}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(items ?? []).map((t) => (
            <button key={t.id} onClick={() => setOpen(t)} className="group text-left">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
                {t.posterUrl ? (
                  <img src={t.posterUrl} alt="" loading="lazy" className="size-full object-cover" />
                ) : (
                  <span className="font-display text-4xl text-muted-foreground/30">▶</span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                    <Play className="h-3 w-3" /> Ver testimonio
                  </span>
                </span>
              </div>
              <p className="mt-4 font-display text-xl leading-tight transition-colors group-hover:text-primary">
                “{t.quote}”
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.author}
                {t.title ? ` · ${t.title}` : ''}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="font-display text-xl">
            {open?.title || open?.author}
          </DialogTitle>
          {open?.videoUrl && (
            <video
              src={open.videoUrl}
              poster={open.posterUrl ?? undefined}
              controls
              preload="none"
              playsInline
              className="w-full rounded-lg"
            />
          )}
          {open?.quote && (
            <p className="text-sm text-muted-foreground">
              “{open.quote}” — {open.author}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
