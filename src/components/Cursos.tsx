import { useEffect, useState } from 'react'
import { Lock, Play } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WA } from '../lib/wa'
import { useSite } from '../lib/site'

type Lesson = {
  id: number
  module_id: number | null
  title: string
  type: string
  free: boolean
  url: string | null
  body: string
}
type Module = { id: number; title: string; lessons: Lesson[] }
type Course = {
  id: number
  slug: string
  title: string
  description: string
  coverUrl: string | null
  hasAccess: boolean
  modules: Module[]
  ungrouped: Lesson[]
}

export function Cursos() {
  const { content } = useSite()
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [open, setOpen] = useState<Course | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => (r.ok ? r.json() : []))
      .then(setCourses)
      .catch(() => setCourses([]))
  }, [])

  if (courses && courses.length === 0) return null

  const totalLessons = (c: Course) =>
    c.modules.reduce((n, m) => n + m.lessons.length, 0) + c.ungrouped.length

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
                {course.modules.length > 0 && `${course.modules.length} módulos · `}
                {totalLessons(course)} lecciones
                {course.hasAccess ? '' : ' · acceso con invitación'}
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
            setLesson(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{open?.title}</DialogTitle>
            <DialogDescription>{open?.description}</DialogDescription>
          </DialogHeader>

          {lesson ? (
            <div className="flex flex-col gap-3">
              {lesson.type === 'text' ? (
                <div className="max-h-[60dvh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border p-5 text-sm leading-relaxed">
                  {lesson.body}
                </div>
              ) : lesson.type === 'audio' ? (
                <audio src={lesson.url ?? ''} controls autoPlay className="w-full" />
              ) : (
                <video src={lesson.url ?? ''} controls autoPlay playsInline className="w-full rounded-lg" />
              )}
              <button
                onClick={() => setLesson(null)}
                className="w-fit text-xs text-muted-foreground underline underline-offset-4"
              >
                ← Volver a las lecciones
              </button>
            </div>
          ) : (
            <div className="flex max-h-[65dvh] flex-col gap-5 overflow-y-auto">
              {open?.modules.map((mod, mi) => (
                <div key={mod.id} className="flex flex-col gap-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
                    Módulo {mi + 1} · {mod.title}
                  </p>
                  {mod.lessons.map((l, li) => (
                    <LessonButton key={l.id} lesson={l} index={li} onOpen={setLesson} course={open} />
                  ))}
                </div>
              ))}
              {open && open.ungrouped.length > 0 && (
                <div className="flex flex-col gap-2">
                  {open.ungrouped.map((l, li) => (
                    <LessonButton key={l.id} lesson={l} index={li} onOpen={setLesson} course={open} />
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function LessonButton({
  lesson,
  index,
  onOpen,
  course,
}: {
  lesson: Lesson
  index: number
  onOpen: (l: Lesson) => void
  course: Course
}) {
  const available = lesson.type === 'text' ? !!lesson.body : !!lesson.url
  const label = lesson.type === 'audio' ? 'audio' : lesson.type === 'text' ? 'texto' : 'video'

  if (!available) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border/60 px-3 py-3 opacity-70">
        <span className="font-display text-lg text-primary/40">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex-1 text-sm text-muted-foreground">{lesson.title}</span>
        <a
          href={WA('Hola JR, quiero acceso al curso ' + course.title)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary underline underline-offset-4"
        >
          <Lock className="h-3.5 w-3.5" /> Solicitar
        </a>
      </div>
    )
  }

  return (
    <button
      onClick={() => onOpen(lesson)}
      className="flex items-center gap-3 rounded-xl border border-border px-3 py-3 text-left transition-colors hover:border-primary/40 hover:text-primary"
    >
      <span className="font-display text-lg text-primary/50">{String(index + 1).padStart(2, '0')}</span>
      <span className="flex-1 text-sm">{lesson.title}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {lesson.free ? 'gratis' : label}
      </span>
      <Play className="h-4 w-4" />
    </button>
  )
}
