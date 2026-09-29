import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  GripVertical,
  RefreshCw,
  RotateCcw,
  Save,
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

type Section = { id: string; label: string; visible: boolean }
type SiteConfig = {
  sections: Section[]
  content: Record<string, string>
  labels: Record<string, string>
  defaults: Record<string, string>
}

const GROUP_TITLE: Record<string, string> = { hero: 'Portada', brand: 'Marca' }

export function Contenido() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [content, setContent] = useState<Record<string, string>>({})
  const [baseline, setBaseline] = useState('')
  const [saving, setSaving] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

  useEffect(() => {
    api<SiteConfig>('/api/settings/site')
      .then((c) => {
        setConfig(c)
        setSections(c.sections)
        setContent(c.content)
        setBaseline(JSON.stringify({ sections: c.sections, content: c.content }))
      })
      .catch(() => toast.error('No se pudo cargar el contenido'))
  }, [])

  const dirty = config !== null && JSON.stringify({ sections, content }) !== baseline

  const groups = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const key of Object.keys(config?.labels ?? {})) {
      const prefix = key.split('.')[0]
      ;(map[prefix] ??= []).push(key)
    }
    return map
  }, [config])

  function move(index: number, delta: number) {
    const next = [...sections]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setSections(next)
  }

  async function save() {
    setSaving(true)
    try {
      const res = await api<SiteConfig>('/api/settings/site', {
        method: 'PUT',
        body: { sections, content },
      })
      setConfig(res)
      setSections(res.sections)
      setContent(res.content)
      setBaseline(JSON.stringify({ sections: res.sections, content: res.content }))
      setPreviewKey((k) => k + 1)
      toast.success('Contenido guardado')
    } catch {
      toast.error('No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  if (!config) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-14 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <div>
          <h1 className="font-display text-2xl leading-none md:text-3xl">Contenido web</h1>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            Textos y orden de las secciones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && <Badge variant="secondary">Sin guardar</Badge>}
          <Button variant="outline" size="sm" asChild>
            <a href="/" target="_blank" rel="noreferrer">
              <ExternalLink data-icon="inline-start" />
              <span className="hidden sm:inline">Ver sitio</span>
            </a>
          </Button>
          <Button onClick={save} disabled={saving || !dirty}>
            <Save data-icon="inline-start" />
            {saving ? 'Guardando…' : 'Guardar'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Tabs defaultValue="secciones">
          <TabsList>
            <TabsTrigger value="secciones">Secciones</TabsTrigger>
            <TabsTrigger value="textos">Textos</TabsTrigger>
          </TabsList>

          <TabsContent value="secciones" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Orden y visibilidad</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="flex items-center gap-2 rounded-xl border p-2 pl-3"
                  >
                    <GripVertical className="size-4 shrink-0 text-muted-foreground/50" />
                    <span className="flex-1 truncate text-sm">{section.label}</span>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-10"
                        aria-label={`Subir ${section.label}`}
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                      >
                        <ArrowUp />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-10"
                        aria-label={`Bajar ${section.label}`}
                        disabled={index === sections.length - 1}
                        onClick={() => move(index, 1)}
                      >
                        <ArrowDown />
                      </Button>
                    </div>
                    <Switch
                      checked={section.visible}
                      onCheckedChange={(checked) =>
                        setSections((prev) =>
                          prev.map((s) => (s.id === section.id ? { ...s, visible: checked } : s)),
                        )
                      }
                      aria-label={`Mostrar ${section.label}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="textos" className="flex flex-col gap-4 pt-4">
            {Object.entries(groups).map(([group, keys]) => (
              <Card key={group}>
                <CardHeader>
                  <CardTitle className="capitalize">{GROUP_TITLE[group] ?? group}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    {keys.map((key) => {
                      const value = content[key] ?? ''
                      const changed = value !== (config.defaults[key] ?? '')
                      const long = value.length > 60
                      const set = (v: string) => setContent((prev) => ({ ...prev, [key]: v }))
                      return (
                        <Field key={key}>
                          <div className="flex items-center justify-between gap-2">
                            <FieldLabel htmlFor={key}>{config.labels[key]}</FieldLabel>
                            {changed && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => set(config.defaults[key] ?? '')}
                              >
                                <RotateCcw data-icon="inline-start" />
                                Restablecer
                              </Button>
                            )}
                          </div>
                          {long ? (
                            <Textarea
                              id={key}
                              rows={3}
                              value={value}
                              onChange={(e) => set(e.target.value)}
                            />
                          ) : (
                            <Input id={key} value={value} onChange={(e) => set(e.target.value)} />
                          )}
                        </Field>
                      )
                    })}
                  </FieldGroup>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="hidden lg:block">
          <div className="sticky top-32">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Vista previa
              </span>
              <Button variant="ghost" size="sm" onClick={() => setPreviewKey((k) => k + 1)}>
                <RefreshCw data-icon="inline-start" />
                Actualizar
              </Button>
            </div>
            <iframe
              key={previewKey}
              src="/"
              title="Vista previa del sitio"
              className="h-[calc(100dvh-13rem)] w-full rounded-xl border bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
