import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Film, Files, HardDrive, Image as ImageIcon, Upload } from 'lucide-react'
import { api } from '@/lib/api'
import { baseName, formatBytes, isImage, isVideo, type MediaObject } from '@/lib/media'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  count: { label: 'Subidas', color: 'var(--chart-1)' },
} satisfies ChartConfig

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function monthlyData(objects: MediaObject[]) {
  const now = new Date()
  const buckets: { key: string; month: string; count: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: MONTHS[d.getMonth()],
      count: 0,
    })
  }
  for (const o of objects) {
    if (!o.modified) continue
    const d = new Date(o.modified)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const bucket = buckets.find((b) => b.key === key)
    if (bucket) bucket.count++
  }
  return buckets
}

export function Dashboard() {
  const [objects, setObjects] = useState<MediaObject[] | null>(null)

  useEffect(() => {
    api<{ objects: MediaObject[] }>('/api/objects')
      .then((r) => setObjects(r.objects))
      .catch(() => setObjects([]))
  }, [])

  const stats = useMemo(() => {
    const list = objects ?? []
    return {
      total: list.length,
      bytes: list.reduce((sum, o) => sum + o.size, 0),
      videos: list.filter((o) => isVideo(o.key)).length,
      images: list.filter((o) => isImage(o.key)).length,
      recent: [...list]
        .sort((a, b) => new Date(b.modified ?? 0).getTime() - new Date(a.modified ?? 0).getTime())
        .slice(0, 6),
      monthly: monthlyData(list),
    }
  }, [objects])

  const loading = objects === null

  const cards = [
    { label: 'Archivos', value: stats.total, icon: Files },
    { label: 'Almacenado', value: formatBytes(stats.bytes), icon: HardDrive },
    { label: 'Videos', value: stats.videos, icon: Film },
    { label: 'Imágenes', value: stats.images, icon: ImageIcon },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl leading-none">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resumen de tu contenido.</p>
        </div>
        <Button asChild>
          <Link to="/biblioteca">
            <Upload data-icon="inline-start" />
            Subir contenido
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader>
              <CardDescription>{c.label}</CardDescription>
              <CardTitle className="font-display text-3xl">
                {loading ? <Skeleton className="h-8 w-24" /> : c.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <c.icon className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Subidas por mes</CardTitle>
            <CardDescription>Últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[240px] w-full" />
            ) : (
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <BarChart data={stats.monthly}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={6} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recientes</CardTitle>
            <CardDescription>Últimos archivos subidos.</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {loading ? (
              <div className="flex flex-col gap-2 px-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Archivo</TableHead>
                    <TableHead className="text-right">Tamaño</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recent.map((o) => (
                    <TableRow key={o.key}>
                      <TableCell className="max-w-[220px]">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {isVideo(o.key) ? 'video' : isImage(o.key) ? 'imagen' : 'otro'}
                          </Badge>
                          <span className="truncate text-sm">{baseName(o.key)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                        {formatBytes(o.size)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
