import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowDown, ArrowUp, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { AssetPickerDialog } from '@/components/AssetPickerDialog'
import type { Asset } from '@/lib/media'

type Testimonial = {
  id: string
  asset_id: string
  title: string
  quote: string
  author: string
  status: string
  published: boolean
  position: number
  posterUrl: string | null
  videoUrl: string | null
  asset_title: string | null
}

function statusVariant(status: string) {
  if (status === 'ready') return 'default'
  if (status === 'error') return 'destructive'
  return 'secondary'
}

function EditDialog({
  testimonial,
  onClose,
  onSaved,
}: {
  testimonial: Testimonial
  onClose: () => void
  onSaved: () => void
}) {
  const [title, setTitle] = useState(testimonial.title)
  const [author, setAuthor] = useState(testimonial.author)
  const [quote, setQuote] = useState(testimonial.quote)
  const [saving, setSaving] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await api(`/api/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        body: { title, author, quote },
      })
      toast.success('Testimonio guardado')
      onSaved()
      onClose()
    } catch {
      toast.error('No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar testimonio</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="t-author">Autor</FieldLabel>
              <Input id="t-author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="t-title">Título (opcional)</FieldLabel>
              <Input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="t-quote">Frase</FieldLabel>
              <Textarea
                id="t-quote"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </Field>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function Testimonios() {
  const [items, setItems] = useState<Testimonial[] | null>(null)
  const [creating, setCreating] = useState(false)
  const [picking, setPicking] = useState(false)
  const [assetId, setAssetId] = useState('')
  const [assetName, setAssetName] = useState('')
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Testimonial | null>(null)

  async function load() {
    try {
      setItems(await api<Testimonial[]>('/api/testimonials'))
    } catch {
      toast.error('No se pudieron cargar los testimonios')
      setItems([])
    }
  }

  useEffect(() => {
    void load()
    const id = setInterval(() => {
      setItems((prev) => {
        if (prev?.some((t) => t.status === 'processing' || t.status === 'pending')) void load()
        return prev
      })
    }, 15000)
    return () => clearInterval(id)
  }, [])

  function pick(asset: Asset) {
    setAssetId(asset.id)
    setAssetName(asset.title || asset.key)
  }

  async function create(event: FormEvent) {
    event.preventDefault()
    if (!assetId) {
      toast.error('Elige un video')
      return
    }
    try {
      await api('/api/testimonials', {
        body: { asset_id: Number(assetId), author, quote },
      })
      toast.success('Testimonio creado; procesando video…')
      setCreating(false)
      setAssetId('')
      setAssetName('')
      setAuthor('')
      setQuote('')
      await load()
    } catch {
      toast.error('No se pudo crear')
    }
  }

  async function togglePublished(t: Testimonial, published: boolean) {
    try {
      await api(`/api/testimonials/${t.id}`, { method: 'PATCH', body: { published } })
      await load()
    } catch {
      toast.error('No se pudo actualizar')
    }
  }

  async function move(index: number, delta: number) {
    if (!items) return
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const a = items[index]
    const b = items[target]
    try {
      await api(`/api/testimonials/${a.id}`, { method: 'PATCH', body: { position: b.position } })
      await api(`/api/testimonials/${b.id}`, { method: 'PATCH', body: { position: a.position } })
      await load()
    } catch {
      toast.error('No se pudo reordenar')
    }
  }

  async function reprocess(t: Testimonial) {
    try {
      await api(`/api/testimonials/${t.id}/reprocess`, { method: 'POST' })
      toast.success('Reprocesando…')
      await load()
    } catch {
      toast.error('No se pudo reprocesar')
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    const id = pendingDelete.id
    setPendingDelete(null)
    try {
      await api(`/api/testimonials/${id}`, { method: 'DELETE' })
      toast.success('Eliminado')
      await load()
    } catch {
      toast.error('No se pudo eliminar')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Testimonios</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Elige videos de la biblioteca como historias reales de JR.
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus data-icon="inline-start" />
          Nuevo testimonio
        </Button>
      </div>

      {items === null ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>Sin testimonios</EmptyTitle>
            <EmptyDescription>
              Elige un video de la biblioteca y publícalo como testimonio.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, index) => (
            <Card key={t.id} className="overflow-hidden pt-0">
              <div className="relative flex aspect-video items-center justify-center bg-muted">
                {t.posterUrl ? (
                  <img src={t.posterUrl} alt="" className="size-full object-cover" />
                ) : (
                  <span className="font-display text-4xl text-muted-foreground/30">▶</span>
                )}
                <Badge variant={statusVariant(t.status)} className="absolute top-2 left-2">
                  {t.status}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="leading-tight">{t.author || t.asset_title || 'Sin autor'}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">“{t.quote}”</p>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Switch
                      checked={t.published}
                      disabled={t.status !== 'ready'}
                      onCheckedChange={(v) => togglePublished(t, v)}
                    />
                    Publicado
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Subir"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Bajar"
                      disabled={index === items.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowDown />
                    </Button>
                    {(t.status === 'error' || t.status === 'pending') && (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Reprocesar"
                        onClick={() => reprocess(t)}
                      >
                        <RefreshCw />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Editar"
                      onClick={() => setEditing(t)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Eliminar"
                      onClick={() => setPendingDelete(t)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nuevo testimonio</DialogTitle>
          </DialogHeader>
          <form onSubmit={create}>
            <FieldGroup>
              <Field>
                <FieldLabel>Video de la biblioteca</FieldLabel>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setPicking(true)}>
                    Elegir video
                  </Button>
                  <span className="truncate text-sm text-muted-foreground">
                    {assetName || 'Ninguno'}
                  </span>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="n-author">Autor</FieldLabel>
                <Input
                  id="n-author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ej. María G. — Lima"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="n-quote">Frase</FieldLabel>
                <Textarea
                  id="n-quote"
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
              </Field>
              <p className="text-xs text-muted-foreground">
                Al crear, se genera poster y versión web (720p). El original no se toca.
              </p>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setCreating(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!assetId}>
                  Crear
                </Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      <AssetPickerDialog open={picking} onOpenChange={setPicking} onPick={pick} />

      {editing && (
        <EditDialog testimonial={editing} onClose={() => setEditing(null)} onSaved={load} />
      )}

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar testimonio?</AlertDialogTitle>
            <AlertDialogDescription>
              Se quita de la web. El video original queda en la biblioteca.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
