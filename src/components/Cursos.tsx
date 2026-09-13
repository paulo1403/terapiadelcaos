import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { useSite } from '../lib/site'

type Lesson = { id: number; title: string; url: string | null; free: boolean }
type Course = {
  id: number
  slug: string
  title: string
  description: string
  coverUrl: string | null
  hasAccess: boolean
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
    <section id="cursos" className="section">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow-pill">Cursos</span>
          <h2 className="h2">{content['cursos.title'] ?? 'Cursos'}</h2>
          <p className="lead">{content['cursos.lead'] ?? ''}</p>
        </div>

        <div className="courses">
          {(courses ?? []).map((course) => (
            <button key={course.id} onClick={() => setOpen(course)} className="course">
              <div className="course-thumb">
                {course.coverUrl ? (
                  <img src={course.coverUrl} alt="" />
                ) : (
                  <span className="course-glyph">▶</span>
                )}
                <span className="course-play">
                  <span>
                    <Play className="size-3" /> Ver curso
                  </span>
                </span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.description}</p>
              <p className="course-meta">
                {course.lessons.length} {course.lessons.length === 1 ? 'lección' : 'lecciones'}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={!!open}
        onClose={() => {
          setOpen(null)
          setPlaying(null)
        }}
        title={open?.title ?? ''}
      >
        <p className="body-sm">{open?.description}</p>
        {playing ? (
          <div className="mt-4">
            <video src={playing.url ?? ''} controls autoPlay playsInline className="rounded-xl full" />
            <button onClick={() => setPlaying(null)} className="lesson-back">
              ← Volver a lecciones
            </button>
          </div>
        ) : (
          <div className="lessons">
            {open?.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => lesson.url && setPlaying(lesson)}
                className="lesson"
                disabled={!lesson.url}
              >
                <span className="lesson-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="lesson-title">{lesson.title}</span>
                <Play className="size-4" />
              </button>
            ))}
          </div>
        )}
      </Modal>
    </section>
  )
}
