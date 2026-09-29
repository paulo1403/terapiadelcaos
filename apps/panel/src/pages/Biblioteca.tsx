import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ChevronLeft, ChevronRight, Pencil, Play, Search, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { baseName, formatBytes, isImage, isVideo } from '@/lib/media'
import { optimizeImage } from '@/lib/image'
import { uploadFile } from '@/lib/upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

type Asset = {
  id: string
  key: string
  title: string | null
  size: string
  mime: string | null
  created_at: string
  url?: string
}

const LIMIT = 20

function typeOf(key: string) {
  return isVideo(key) ? 'video' : isImage(key) ? 'imagen' : 'otro'
}

function displayTitle(asset: Asset) {
  return asset.title || baseName(asset.key)
}

function EditTitleDialog({
  asset,
  onClose,
  onSaved,
}: {
  asset: Asset
  onClose: () => void
  onSaved: () => void
}) {
  const [title, setTitle] = useState(asset.title ?? '')
  const [saving, setSaving] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    try {
      await api(`/api/assets/${asset.id}`, { method: 'PATCH', body: { title } })
      toast.success('Título guardado')
      onSaved()
      onClose()
    } catch {
      toast.error('No se pudo guardar el título')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar título</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="asset-title">Título</FieldLabel>
              <Input
                id="asset-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
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

export function Biblioteca() {
  const [items, setItems] = useState<Asset[] | null>(null)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState<Asset | null>(null)
  const [editing, setEditing] = useState<Asset | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Asset | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function load(nextOffset = offset, q = search) {
    setItems(null)
    try {
      const res = await api<{ items: Asset[]; total: number }>(
        `/api/assets?limit=${LIMIT}&offset=${nextOffset}&q=${encodeURIComponent(q)}`,
      )
      setItems(res.items)
      setTotal(res.total)
      setOffset(nextOffset)
    } catch {
      toast.error('No se pudo cargar la biblioteca')
      setItems([])
    }
  }

  useEffect(() => {
    void load(0, '')
  }, [])

  async function onFiles(files: FileList) {
    for (const file of Array.from(files)) {
      setUploading(file.name)
      setProgress(0)
      try {
        const prepared = await optimizeImage(file)
        const date = new Date().toISOString().slice(0, 10)
        await uploadFile(prepared, `uploads/${date}/${Date.now()}-${prepared.name}`, setProgress)
        toast.success(`${prepared.name} subido`)
      } catch {
        toast.error(`Falló la subida de ${file.name}`)
      }
    }
    setUploading(null)
    await load(0, search)
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    const id = pendingDelete.id
    setPendingDelete(null)
    try {
      await api(`/api/assets/${id}`, { method: 'DELETE' })
      toast.success('Archivo borrado')
      await load(offset, search)
    } catch {
      toast.error('No se pudo borrar')
    }
  }

  const pages = Math.max(1, Math.ceil(total / LIMIT))
  const page = Math.floor(offset / LIMIT) + 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Biblioteca</h1>
          <p className="mt-1 text-sm text-muted-foreground">{total} archivos</p>
        </div>
        <Button onClick={() => inputRef.current?.click()} disabled={!!uploading}>
          <Upload data-icon="inline-start" />
          Subir
        </Button>
      </div>

      <form
        className="flex max-w-sm items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          void load(0, query)
          setSearch(query)
        }}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título…"
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="secondary">
          Buscar
        </Button>
      </form>

      {uploading && (
        <div className="flex flex-col gap-2 rounded-xl border p-4">
          <p className="truncate text-sm text-muted-foreground">Subiendo {uploading}</p>
          <Progress value={Math.round(progress * 100)} />
        </div>
      )}

      {items === null ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Upload />
            </EmptyMedia>
            <EmptyTitle>{search ? 'Sin resultados' : 'Sin contenido'}</EmptyTitle>
            <EmptyDescription>
              {search ? 'Prueba con otra búsqueda.' : 'Sube tu primer video o imagen.'}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Vista</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden sm:table-cell">Tipo</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="w-16">
                    <button
                      type="button"
                      onClick={() => setPlaying(asset)}
                      className="grid size-12 place-items-center overflow-hidden rounded-lg border bg-muted"
                      aria-label="Ver"
                    >
                      {isImage(asset.key) && asset.url ? (
                        <img
                          src={asset.url}
                          alt=""
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground">
                          {isVideo(asset.key) ? '▶' : '•'}
                        </span>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="max-w-[280px]">
                    <span className="block truncate text-sm">{displayTitle(asset)}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">{typeOf(asset.key)}</Badge>
                  </TableCell>
                  <TableCell className="text-sm tabular-nums text-muted-foreground">
                    {formatBytes(Number(asset.size))}
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {new Date(asset.created_at).toLocaleDateString('es-PE')}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Editar título"
                      onClick={() => setEditing(asset)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Ver"
                      onClick={() => setPlaying(asset)}
                    >
                      <Play />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Borrar"
                      onClick={() => setPendingDelete(asset)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => load(offset - LIMIT, search)}
            aria-label="Anterior"
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {page} de {pages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={page >= pages}
            onClick={() => load(offset + LIMIT, search)}
            aria-label="Siguiente"
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) void onFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {editing && (
        <EditTitleDialog
          asset={editing}
          onClose={() => setEditing(null)}
          onSaved={() => load(offset, search)}
        />
      )}

      <Dialog open={!!playing} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="truncate">
              {playing ? displayTitle(playing) : ''}
            </DialogTitle>
          </DialogHeader>
          {playing && isImage(playing.key) && playing.url ? (
            <img src={playing.url} alt="" className="mx-auto max-h-[75dvh] rounded-lg" />
          ) : (
            <video src={playing?.url} controls autoPlay playsInline className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar archivo?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete ? displayTitle(pendingDelete) : ''} se eliminará de forma permanente.
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
