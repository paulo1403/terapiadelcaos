import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { WhatsappFab } from './components/WhatsappFab'
import { Footer } from './components/Footer'
import { useSite } from './lib/site'
import './App.css'

const TresCaminos = lazy(() =>
  import('./components/TresCaminos').then((m) => ({ default: m.TresCaminos })),
)
const Quiz = lazy(() => import('./components/Quiz').then((m) => ({ default: m.Quiz })))
const Terapia = lazy(() => import('./components/Terapia').then((m) => ({ default: m.Terapia })))
const WakeUp = lazy(() => import('./components/WakeUp').then((m) => ({ default: m.WakeUp })))
const Cursos = lazy(() => import('./components/Cursos').then((m) => ({ default: m.Cursos })))
const Audiolibros = lazy(() =>
  import('./components/Audiolibros').then((m) => ({ default: m.Audiolibros })),
)
const Despertares = lazy(() =>
  import('./components/Despertares').then((m) => ({ default: m.Despertares })),
)
const Medicina = lazy(() =>
  import('./components/Medicina').then((m) => ({ default: m.Medicina })),
)
const JR = lazy(() => import('./components/JR').then((m) => ({ default: m.JR })))

const REGISTRY: Record<string, ComponentType> = {
  hero: Hero,
  tresCaminos: TresCaminos,
  quiz: Quiz,
  terapia: Terapia,
  wakeup: WakeUp,
  cursos: Cursos,
  audiolibros: Audiolibros,
  despertares: Despertares,
  medicina: Medicina,
  jr: JR,
}

export default function App() {
  const { sections } = useSite()

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        {sections.map((section) => {
          const Section = REGISTRY[section.id]
          if (!Section) return null
          return (
            <Suspense key={section.id} fallback={null}>
              {section.id === 'hero' ? <Section /> : (
                <div className="reveal">
                  <Section />
                </div>
              )}
            </Suspense>
          )
        })}
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
