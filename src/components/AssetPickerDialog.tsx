import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { baseName, isVideo, type Asset } from '@/lib/media'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function AssetPickerDialog({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPick: (asset: Asset) => void
}) {
  const [items, setItems] = useState<Asset[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!open) return
    api<{ items: Asset[] }>(`/api/assets?limit=100&q=${encodeURIComponent(q)}`)
      .then((r) => setItems(r.items))
      .catch(() => setItems([]))
  }, [open, q])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Elegir de la biblioteca</DialogTitle>
        </DialogHeader>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" />
        <div className="flex max-h-[55dvh] flex-col divide-y divide-border overflow-y-auto">
          {items.map((asset) => (
            <button
              key={asset.id}
              type="button"
              onClick={() => {
                onPick(asset)
                onOpenChange(false)
              }}
              className="flex items-center gap-3 py-2 text-left transition-colors hover:text-primary"
            >
              <span className="grid size-10 place-items-center overflow-hidden rounded bg-muted text-xs">
                {asset.url && !isVideo(asset.key) ? (
                  <img src={asset.url} alt="" className="size-full object-cover" />
                ) : (
                  <span>{isVideo(asset.key) ? '▶' : '•'}</span>
                )}
              </span>
              <span className="flex-1 truncate text-sm">{asset.title || baseName(asset.key)}</span>
            </button>
          ))}
          {items.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Sin resultados.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
