import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { baseName, type Asset } from '@/lib/media'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { AssetPickerDialog } from '@/components/AssetPickerDialog'

type Lesson = {
  id: number
  module_id: number | null
  asset_id: number | null
  title: string
  type: string
  body: string
  position: number
  free: boolean
  url?: string | null
}
type Module = { id: number; title: string; position: number; lessons: Lesson[] }
type Course = {
  id: number
  title: string
  description: string
  published: boolean
  cover_asset_id: number | null
  cover_url: string | null
  modules: Module[]
  ungrouped: Lesson[]
}

const TYPE_LABEL: Record<string, string> = { video: 'video', audio: 'audio', text: 'texto' }

function LessonDialog({
  courseId,
  moduleId,
  lesson,
  onClose,
  onSaved,
}: {
  courseId: string | undefined
  moduleId: number | null
  lesson?: Lesson
  onClose: () => void
  onSaved: () => void
}) {
  const [type, setType] = useState(lesson?.type ?? 'video')
  const [title, setTitle] = useState(lesson?.title ?? '')
  const [body, setBody] = useState(lesson?.body ?? '')
  const [assetId, setAssetId] = useState<string>('')
  const [assetName, setAssetName] = useState('')
  const [picking, setPicking] = useState(false)
  const [saving, setSaving] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      if (lesson) {
        await api(`/api/courses/lessons/${lesson.id}`, {
          method: 'PATCH',
          body: { title, type, body },
        })
      } else {
        await api(`/api/courses/${courseId}/lessons`, {
          body: {
            module_id: moduleId,
            title,
            type,
            body,
            asset_id: type !== 'text' && assetId ? Number(assetId) : null,
          },
        })
      }
      toast.success(lesson ? 'Lección guardada' : 'Lección agregada')
      onSaved()
      onClose()
    } catch {
      toast.error('No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  function pick(asset: Asset) {
    setAssetId(asset.id)
    setAssetName(asset.title || baseName(asset.key))
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{lesson ? 'Editar lección' : 'Nueva lección'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Tipo</FieldLabel>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="text">Texto</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="l-title">Título</FieldLabel>
              <Input id="l-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>
            {type === 'text' ? (
              <Field>
                <FieldLabel htmlFor="l-body">Contenido</FieldLabel>
                <Textarea id="l-body" rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
              </Field>
            ) : (
              <Field>
                <FieldLabel>Archivo ({type})</FieldLabel>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setPicking(true)}>
                    Elegir
                  </Button>
                  <span className="truncate text-sm text-muted-foreground">
                    {assetName || (lesson?.asset_id ? 'Actual' : 'Ninguno')}
                  </span>
                </div>
              </Field>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving || !title}>
                {saving ? 'Guardando…' : 'Guardar'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
      <AssetPickerDialog open={picking} onOpenChange={setPicking} onPick={pick} />
    </Dialog>
  )
}

export function CursoDetalle() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [coverAssetId, setCoverAssetId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [pickingCover, setPickingCover] = useState(false)
  const [addingModule, setAddingModule] = useState(false)
  const [moduleTitle, setModuleTitle] = useState('')
  const [lessonTarget, setLessonTarget] = useState<{ moduleId: number | null } | null>(null)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [pendingRemove, setPendingRemove] = useState<Lesson | null>(null)

  function apply(c: Course) {
    setCourse(c)
    setTitle(c.title)
    setDescription(c.description)
    setPublished(c.published)
    setCoverAssetId(c.cover_asset_id)
  }

  async function load() {
    try {
      apply(await api<Course>(`/api/courses/${id}`))
    } catch {
      toast.error('No se pudo cargar el curso')
    }
  }

  useEffect(() => {
    void load()
  }, [id])

  async function save() {
    setSaving(true)
    try {
      apply(
        await api<Course>(`/api/courses/${id}`, {
          method: 'PUT',
          body: { title, description, published, cover_asset_id: coverAssetId },
        }),
      )
      toast.success('Curso guardado')
    } catch {
      toast.error('No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  async function createModule(e: FormEvent) {
    e.preventDefault()
    try {
      apply(await api<Course>(`/api/courses/${id}/modules`, { body: { title: moduleTitle } }))
      setModuleTitle('')
      setAddingModule(false)
      toast.success('Módulo agregado')
    } catch {
      toast.error('No se pudo agregar')
    }
  }

  async function moveModule(index: number, delta: number) {
    if (!course) return
    const next = [...course.modules]
    const t = index + delta
    if (t < 0 || t >= next.length) return
    ;[next[index], next[t]] = [next[t], next[index]]
    try {
      apply(await api<Course>(`/api/courses/${id}/modules/reorder`, { body: { ids: next.map((m) => m.id) } }))
    } catch {
      toast.error('No se pudo reordenar')
    }
  }

  async function removeModule(moduleId: number) {
    try {
      apply(await api<Course>(`/api/modules/${moduleId}`, { method: 'DELETE' }))
      toast.success('Módulo eliminado')
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  async function toggleFree(lesson: Lesson, free: boolean) {
    try {
      apply(await api<Course>(`/api/courses/lessons/${lesson.id}`, { method: 'PATCH', body: { free } }))
    } catch {
      toast.error('No se pudo actualizar')
    }
  }

  async function moveLesson(list: Lesson[], index: number, delta: number) {
    const next = [...list]
    const t = index + delta
    if (t < 0 || t >= next.length) return
    ;[next[index], next[t]] = [next[t], next[index]]
    try {
      apply(await api<Course>(`/api/courses/${id}/reorder`, { body: { ids: next.map((l) => l.id) } }))
    } catch {
      toast.error('No se pudo reordenar')
    }
  }

  async function confirmRemove() {
    if (!pendingRemove) return
    const lid = pendingRemove.id
    setPendingRemove(null)
    try {
      apply(await api<Course>(`/api/courses/lessons/${lid}`, { method: 'DELETE' }))
      toast.success('Lección eliminada')
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  function LessonRow({ lesson, list, index }: { lesson: Lesson; list: Lesson[]; index: number }) {
    return (
      <div className="flex items-center gap-2 rounded-xl border p-2 pl-3">
        <span className="w-6 text-center font-display text-lg text-primary/50">{index + 1}</span>
        <Badge variant="secondary">{TYPE_LABEL[lesson.type] ?? lesson.type}</Badge>
        <span className="flex-1 truncate text-sm">{lesson.title}</span>
        <label className="flex items-center gap-1 text-xs text-muted-foreground">
          <Switch checked={lesson.free} onCheckedChange={(v) => toggleFree(lesson, v)} />
          gratis
        </label>
        <Button variant="ghost" size="icon" className="size-9" aria-label="Subir" disabled={index === 0} onClick={() => moveLesson(list, index, -1)}>
          <ArrowUp />
        </Button>
        <Button variant="ghost" size="icon" className="size-9" aria-label="Bajar" disabled={index === list.length - 1} onClick={() => moveLesson(list, index, 1)}>
          <ArrowDown />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Editar" onClick={() => setEditingLesson(lesson)}>
          <Pencil />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Eliminar" onClick={() => setPendingRemove(lesson)}>
          <Trash2 />
        </Button>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild aria-label="Volver">
          <Link to="/cursos">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="font-display text-3xl leading-none">{course.title}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Datos del curso</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="c-title">Título</FieldLabel>
                <Input id="c-title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="c-desc">Descripción</FieldLabel>
                <Textarea id="c-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </Field>
              <div className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-medium">Publicado</p>
                  <p className="text-xs text-muted-foreground">Visible en la web.</p>
                </div>
                <Switch checked={published} onCheckedChange={setPublished} />
              </div>
              <div className="flex items-center gap-3">
                <div className="grid size-16 place-items-center overflow-hidden rounded-lg border bg-muted">
                  {course.cover_url ? (
                    <img src={course.cover_url} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground/40">▢</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setPickingCover(true)}>
                    Elegir portada
                  </Button>
                  {coverAssetId && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setCoverAssetId(null)}>
                      Quitar
                    </Button>
                  )}
                </div>
              </div>
              <Button onClick={save} disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar curso'}
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Contenido</CardTitle>
            <Button size="sm" onClick={() => setAddingModule(true)}>
              <Plus data-icon="inline-start" />
              Módulo
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {course.modules.map((mod, mi) => (
              <div key={mod.id} className="rounded-xl border">
                <div className="flex items-center gap-1 border-b p-2 pl-3">
                  <span className="font-display text-lg text-primary/50">{mi + 1}</span>
                  <span className="flex-1 truncate text-sm font-medium">{mod.title}</span>
                  <Button variant="ghost" size="icon" className="size-9" aria-label="Subir módulo" disabled={mi === 0} onClick={() => moveModule(mi, -1)}>
                    <ArrowUp />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-9" aria-label="Bajar módulo" disabled={mi === course.modules.length - 1} onClick={() => moveModule(mi, 1)}>
                    <ArrowDown />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Eliminar módulo" onClick={() => removeModule(mod.id)}>
                    <Trash2 />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {mod.lessons.map((lesson, li) => (
                    <LessonRow key={lesson.id} lesson={lesson} list={mod.lessons} index={li} />
                  ))}
                  <Button variant="ghost" size="sm" className="justify-start" onClick={() => setLessonTarget({ moduleId: mod.id })}>
                    <Plus data-icon="inline-start" />
                    Lección
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Sin módulo</p>
              {course.ungrouped.map((lesson, li) => (
                <LessonRow key={lesson.id} lesson={lesson} list={course.ungrouped} index={li} />
              ))}
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => setLessonTarget({ moduleId: null })}>
                <Plus data-icon="inline-start" />
                Lección suelta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AssetPickerDialog open={pickingCover} onOpenChange={setPickingCover} onPick={(a) => setCoverAssetId(Number(a.id))} />

      <Dialog open={addingModule} onOpenChange={setAddingModule}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo módulo</DialogTitle>
          </DialogHeader>
          <form onSubmit={createModule}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="m-title">Título</FieldLabel>
                <Input id="m-title" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} autoFocus required />
              </Field>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setAddingModule(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!moduleTitle}>
                  Crear
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      {lessonTarget && (
        <LessonDialog courseId={id} moduleId={lessonTarget.moduleId} onClose={() => setLessonTarget(null)} onSaved={load} />
      )}
      {editingLesson && (
        <LessonDialog courseId={id} moduleId={editingLesson.module_id} lesson={editingLesson} onClose={() => setEditingLesson(null)} onSaved={load} />
      )}

      <AlertDialog open={!!pendingRemove} onOpenChange={(o) => !o && setPendingRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar lección?</AlertDialogTitle>
            <AlertDialogDescription>{pendingRemove?.title} se quitará del curso.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Separator className="sr-only" />
    </div>
  )
}
