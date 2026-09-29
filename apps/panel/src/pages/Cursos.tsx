import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

type Course = {
  id: number
  title: string
  description: string
  published: boolean
  lesson_count: number
  cover_url: string | null
}

export function Cursos() {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState('')
  const [pendingDelete, setPendingDelete] = useState<Course | null>(null)
  const navigate = useNavigate()

  async function load() {
    try {
      setCourses(await api<Course[]>('/api/courses'))
    } catch {
      toast.error('No se pudieron cargar los cursos')
      setCourses([])
    }
  }

  useEffect(() => {
    void load()
  }, [])

  async function create(event: FormEvent) {
    event.preventDefault()
    try {
      const course = await api<{ id: number }>('/api/courses', { body: { title } })
      navigate(`/cursos/${course.id}`)
    } catch {
      toast.error('No se pudo crear el curso')
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    const id = pendingDelete.id
    setPendingDelete(null)
    try {
      await api(`/api/courses/${id}`, { method: 'DELETE' })
      toast.success('Curso borrado')
      await load()
    } catch {
      toast.error('No se pudo borrar')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Cursos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Crea cursos con tus videos.</p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus data-icon="inline-start" />
          Nuevo curso
        </Button>
      </div>

      {courses === null ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GraduationCap />
            </EmptyMedia>
            <EmptyTitle>Todavía no hay cursos</EmptyTitle>
            <EmptyDescription>Crea tu primer curso y agrégale lecciones.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden pt-0">
              <Link to={`/cursos/${course.id}`} className="block">
                <div className="flex aspect-video items-center justify-center bg-muted">
                  {course.cover_url ? (
                    <img src={course.cover_url} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="font-display text-4xl text-muted-foreground/30">▶</span>
                  )}
                </div>
              </Link>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="leading-tight">
                    <Link to={`/cursos/${course.id}`} className="hover:text-primary">
                      {course.title}
                    </Link>
                  </CardTitle>
                  <Badge variant={course.published ? 'default' : 'secondary'}>
                    {course.published ? 'publicado' : 'borrador'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {course.lesson_count} {course.lesson_count === 1 ? 'lección' : 'lecciones'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Borrar curso"
                  onClick={() => setPendingDelete(course)}
                >
                  <Trash2 />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo curso</DialogTitle>
          </DialogHeader>
          <form onSubmit={create}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="course-title">Título</FieldLabel>
                <Input
                  id="course-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  required
                />
              </Field>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setCreating(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!title}>
                  Crear
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar curso?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.title} y sus lecciones se eliminarán.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Borrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
