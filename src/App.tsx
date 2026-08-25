import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Terapia } from './components/Terapia'
import { WakeUp } from './components/WakeUp'
import { Captacion } from './components/Captacion'
import { Audiolibros } from './components/Audiolibros'
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
      </main>
    </>
  )
}
