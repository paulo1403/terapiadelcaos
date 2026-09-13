import type { ComponentType } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TresCaminos } from './components/TresCaminos'
import { Terapia } from './components/Terapia'
import { WakeUp } from './components/WakeUp'
import { Cursos } from './components/Cursos'
import { Quiz } from './components/Quiz'
import { Audiolibros } from './components/Audiolibros'
import { Despertares } from './components/Despertares'
import { Medicina } from './components/Medicina'
import { JR } from './components/JR'
import { WhatsappFab } from './components/WhatsappFab'
import { Footer } from './components/Footer'
import { useSite } from './lib/site'
import './App.css'

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
          return Section ? <Section key={section.id} /> : null
        })}
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
