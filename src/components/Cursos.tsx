import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSite } from '../lib/site'

type Lesson = { id: number; title: string; url: string }
type Course = {
  id: number
  slug: string
  title: string
  description: string
  coverUrl: string | null
  lessons: Lesson[]
}

export function Cursos() {
  const { content } = useSite()
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [open, setOpen] = useState<Course | null>(null)
  const [playing, setPlaying] = useState<Lesson | null>(null)

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => (r.ok ? r.json() : []))
      .then(setCourses)
      .catch(() => setCourses([]))
  }, [])

  if (courses && courses.length === 0) return null

  return (
    <section id="cursos" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Cursos</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.02em]">
            {content['cursos.title'] ?? 'Cursos'}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {content['cursos.lead'] ?? ''}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(courses ?? []).map((course) => (
            <button key={course.id} onClick={() => setOpen(course)} className="group text-left">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
                {course.coverUrl ? (
                  <img src={course.coverUrl} alt="" className="size-full object-cover" />
                ) : (
                  <span className="font-display text-4xl text-muted-foreground/30">▶</span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                    <Play className="h-3 w-3" /> Ver curso
                  </span>
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight transition-colors group-hover:text-primary">
                {course.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {course.lessons.length} {course.lessons.length === 1 ? 'lección' : 'lecciones'}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={!!open}
        onOpenChange={(o) => {
          if (!o) {
            setOpen(null)
            setPlaying(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{open?.title}</DialogTitle>
            <DialogDescription>{open?.description}</DialogDescription>
          </DialogHeader>
          {playing ? (
            <div>
              <video
                src={playing.url}
                controls
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <button
                onClick={() => setPlaying(null)}
                className="mt-3 text-xs text-muted-foreground underline underline-offset-4"
              >
                ← Volver a lecciones
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {open?.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setPlaying(lesson)}
                  className="flex items-center gap-3 py-3 text-left transition-colors hover:text-primary"
                >
                  <span className="font-display text-lg text-primary/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm">{lesson.title}</span>
                  <Play className="h-4 w-4" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
