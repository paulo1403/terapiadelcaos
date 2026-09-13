import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { WHATSAPP_LINK } from '../content/site'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { HeroDepth } from './HeroDepth'
import heroDesktop from '../assets/hero-immersive-desktop.png'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.7, ease: 'expo.out' })
      gsap.from('.hero-line', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.1,
      })
      gsap.from('.hero-tail', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
      })
    },
    { scope },
  )

  return (
    <section
      id="inicio"
      ref={scope}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0b0b0c] text-[#efe9df] flex items-end"
    >
      {/* capa base: imagen estática (fallback si no hay WebGL) */}
      <img
        src={heroDesktop}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* parallax de profundidad WebGL */}
      <HeroDepth src={heroDesktop} strength={0.16} className="absolute inset-0 hidden sm:block" />
      {/* overlays: ink para legibilidad + viñeta */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_95%_at_22%_12%,transparent_35%,rgba(8,8,9,0.45)_72%,#08080a_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.15] mix-blend-soft-light" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
        <p className="hero-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-[#c9c2b6]/80">
          JR Rivera · Terapeuta · Desde 2012
        </p>

        <h1 className="mt-5 font-display leading-[0.86] tracking-[-0.02em] text-[clamp(3rem,11vw,8.5rem)]">
          <span className="hero-line block">Terapeuta</span>
          <span className="hero-line block text-primary">del caos</span>
        </h1>

        <div className="hero-tail mt-10 grid max-w-3xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              No viniste a controlar el caos.
              <br />
              <span className="text-primary">Viniste a despertar dentro de él.</span>
            </p>
            <p className="max-w-md text-sm leading-relaxed text-[#efe9df]/70">
              Transformación emocional e integración. Para quienes están listos para un proceso
              diferente — con presencia y acompañamiento real.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-[13px] tracking-wide">
                <a href="#terapia">CONOCER TERAPIA DEL CAOS</a>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-full border-[#efe9df]/25 bg-transparent px-8 text-[13px] tracking-wide text-[#efe9df] hover:bg-[#efe9df]/10 hover:text-[#efe9df]"
                  >
                    VER HISTORIA JR
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-[#efe9df]/15 bg-[#0d0d0f] p-0 overflow-hidden">
                  <DialogTitle className="sr-only">Historia JR</DialogTitle>
                  <div className="flex aspect-video items-center justify-center p-8">
                    <p className="max-w-md text-center font-display text-2xl leading-snug text-[#efe9df]">
                      “No me curaron, me enseñaron a sostenerme.”
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-wide text-[#efe9df]/70 underline underline-offset-4 transition-colors hover:text-primary"
            >
              Hablar con JR por WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
