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
      <Navbar />
      <main>
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
