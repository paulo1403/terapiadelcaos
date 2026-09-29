import { lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CalendarDays, Radio } from 'lucide-react'
import { api } from '@/lib/api'
import { Spinner } from '@/components/ui/spinner'
import { Login } from '@/pages/Login'
import { AdminLayout } from '@/layouts/AdminLayout'

const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Biblioteca = lazy(() =>
  import('@/pages/Biblioteca').then((m) => ({ default: m.Biblioteca })),
)
const Cursos = lazy(() => import('@/pages/Cursos').then((m) => ({ default: m.Cursos })))
const CursoDetalle = lazy(() =>
  import('@/pages/CursoDetalle').then((m) => ({ default: m.CursoDetalle })),
)
const Accesos = lazy(() => import('@/pages/Accesos').then((m) => ({ default: m.Accesos })))
const Contenido = lazy(() =>
  import('@/pages/Contenido').then((m) => ({ default: m.Contenido })),
)
const Configuracion = lazy(() =>
  import('@/pages/Configuracion').then((m) => ({ default: m.Configuracion })),
)
const ComingSoon = lazy(() =>
  import('@/pages/ComingSoon').then((m) => ({ default: m.ComingSoon })),
)
const Testimonios = lazy(() =>
  import('@/pages/Testimonios').then((m) => ({ default: m.Testimonios })),
)

type Auth = 'loading' | 'in' | 'out'

export function App() {
  const [auth, setAuth] = useState<Auth>('loading')

  useEffect(() => {
    api<{ authenticated: boolean }>('/auth/me')
      .then((r) => setAuth(r.authenticated ? 'in' : 'out'))
      .catch(() => setAuth('out'))
  }, [])

  if (auth === 'loading') {
    return (
      <div className="grid min-h-[100dvh] place-items-center">
        <Spinner />
      </div>
    )
  }

  if (auth === 'out') return <Login onSuccess={() => setAuth('in')} />

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={() => setAuth('out')} />}>
        <Route index element={<Dashboard />} />
        <Route path="biblioteca" element={<Biblioteca />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="cursos/:id" element={<CursoDetalle />} />
        <Route path="accesos" element={<Accesos />} />
        <Route
          path="live"
          element={<ComingSoon title="Live" description="Programa transmisiones en vivo." icon={Radio} />}
        />
        <Route path="contenido" element={<Contenido />} />
        <Route path="testimonios" element={<Testimonios />} />
        <Route
          path="eventos"
          element={<ComingSoon title="Eventos" description="Despertares y experiencias presenciales." icon={CalendarDays} />}
        />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
