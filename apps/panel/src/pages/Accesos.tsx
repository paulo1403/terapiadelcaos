import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Copy, KeyRound, MessageCircle, Plus, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
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

type Grant = {
  id: string
  email: string
  course_id: string
  course_title: string
  status: string
  expires_at: string | null
  created_at: string
  link: string
}

type Course = { id: number; title: string }

const fmtDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString('es-PE') : 'Sin vencimiento'

export function Accesos() {
  const [grants, setGrants] = useState<Grant[] | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [creating, setCreating] = useState(false)
  const [email, setEmail] = useState('')
  const [courseId, setCourseId] = useState('')
  const [expires, setExpires] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [pendingRevoke, setPendingRevoke] = useState<Grant | null>(null)

  async function load() {
    try {
      setGrants(await api<Grant[]>('/api/grants'))
    } catch {
      toast.error('No se pudieron cargar los accesos')
      setGrants([])
    }
  }

  useEffect(() => {
    void load()
    api<Course[]>('/api/courses')
      .then((list) => setCourses(list.map((c) => ({ id: c.id, title: c.title }))))
      .catch(() => {})
  }, [])

  async function create(event: FormEvent) {
    event.preventDefault()
    if (!courseId) {
      toast.error('Elige un curso')
      return
    }
    try {
      await api('/api/grants', {
        body: {
          email,
          course_id: Number(courseId),
          expires_at: expires ? new Date(expires).toISOString() : null,
        },
      })
      toast.success('Acceso creado')
      setCreating(false)
      setEmail('')
      setCourseId('')
      setExpires('')
      await load()
    } catch {
      toast.error('No se pudo crear el acceso')
    }
  }

  async function copyLink(grant: Grant) {
    try {
      await navigator.clipboard.writeText(grant.link)
      setCopied(grant.id)
      setTimeout(() => setCopied(null), 1500)
      toast.success('Link copiado')
    } catch {
      toast.error('No se pudo copiar')
    }
  }

  function whatsapp(grant: Grant) {
    const text = `Hola! Tu acceso al curso "${grant.course_title}" está listo. Ábrelo aquí: ${grant.link}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  async function confirmRevoke() {
    if (!pendingRevoke) return
    const id = pendingRevoke.id
    setPendingRevoke(null)
    try {
      await api(`/api/grants/${id}/revoke`, { method: 'POST' })
      toast.success('Acceso revocado')
      await load()
    } catch {
      toast.error('No se pudo revocar')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Accesos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quién puede ver cada curso. Otorga tras el pago.
          </p>
        </div>
        <Button onClick={() => setCreating(true)} disabled={courses.length === 0}>
          <Plus data-icon="inline-start" />
          Agregar acceso
        </Button>
      </div>

      {grants === null ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : grants.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <KeyRound />
            </EmptyMedia>
            <EmptyTitle>Todavía no hay accesos</EmptyTitle>
            <EmptyDescription>
              Agrega el email de un alumno y el curso que puede ver.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Vence</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grants.map((grant) => (
                <TableRow key={grant.id}>
                  <TableCell className="max-w-[220px] truncate text-sm">{grant.email}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">
                    {grant.course_title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={grant.status === 'active' ? 'default' : 'secondary'}>
                      {grant.status === 'active' ? 'activo' : 'revocado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {fmtDate(grant.expires_at)}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Copiar link"
                      onClick={() => copyLink(grant)}
                      disabled={grant.status !== 'active'}
                    >
                      {copied === grant.id ? <Check /> : <Copy />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Enviar por WhatsApp"
                      onClick={() => whatsapp(grant)}
                      disabled={grant.status !== 'active'}
                    >
                      <MessageCircle />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Revocar"
                      onClick={() => setPendingRevoke(grant)}
                      disabled={grant.status !== 'active'}
                    >
                      <XCircle />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar acceso</DialogTitle>
          </DialogHeader>
          <form onSubmit={create}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="grant-email">Email del alumno</FieldLabel>
                <Input
                  id="grant-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Curso</FieldLabel>
                <Select value={courseId} onValueChange={setCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={String(course.id)}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="grant-exp">Vence (opcional)</FieldLabel>
                <Input
                  id="grant-exp"
                  type="date"
                  value={expires}
                  onChange={(e) => setExpires(e.target.value)}
                />
                <FieldDescription>Vacío = sin vencimiento.</FieldDescription>
              </Field>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setCreating(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!email || !courseId}>
                  Crear acceso
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingRevoke} onOpenChange={(open) => !open && setPendingRevoke(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Revocar acceso?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingRevoke?.email} dejará de ver "{pendingRevoke?.course_title}". El link deja de
              funcionar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRevoke}>Revocar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
