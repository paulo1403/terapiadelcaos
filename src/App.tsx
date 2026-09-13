import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TresCaminos } from './components/TresCaminos'
import { Terapia } from './components/Terapia'
import { WakeUp } from './components/WakeUp'
import { Quiz } from './components/Quiz'
import { Audiolibros } from './components/Audiolibros'
import { Despertares } from './components/Despertares'
import { Medicina } from './components/Medicina'
import { JR } from './components/JR'
import { WhatsappFab } from './components/WhatsappFab'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
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
        <Hero />
        <TresCaminos />
        <Quiz />
        <Terapia />
        <WakeUp />
        <Audiolibros />
        <Despertares />
        <Medicina />
        <JR />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  )
}
