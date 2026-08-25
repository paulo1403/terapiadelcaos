import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Terapia } from './components/Terapia'
import { WakeUp } from './components/WakeUp'
import { Captacion } from './components/Captacion'
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
      <Navbar />
      <main>
        <Hero />
        <Terapia />
        <WakeUp />
        <Captacion />
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
