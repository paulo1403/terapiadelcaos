import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BRAND, WHATSAPP_LINK } from '../content/site'
import { Button } from '@/components/ui/button'

export function Hero() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-kicker', { opacity: 0, y: 12, duration: 0.5 })
      .from('.hero-title', { opacity: 0, y: 24, duration: 0.7 }, '-=0.3')
      .from('.hero-sub', { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
      .from('.hero-desc', { opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-cta', { opacity: 0, y: 10, duration: 0.4, stagger: 0.1 }, '-=0.2')
      .from('.hero-tags', { opacity: 0, duration: 0.4 }, '-=0.2')
    gsap.to('.hero-aurora', { xPercent: 4, duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
  }, { scope })

  return (
    <section id="inicio" ref={scope} className="relative min-h-[90vh] flex items-center justify-center px-5 lg:px-8 py-16 overflow-hidden bg-background">
      <div className="hero-aurora absolute inset-0 bg-aurora opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background" />
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <p className="hero-kicker text-muted-foreground text-xs lg:text-sm tracking-[0.35em] font-medium">WAKE UP®</p>
        <h1 className="hero-title font-display text-3xl sm:text-5xl lg:text-6xl text-primary tracking-wide leading-tight">{BRAND.name}</h1>
        <div className="hero-sub space-y-2 font-light">
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground">NO VINISTE A CONTROLAR EL CAOS.</p>
          <p className="text-lg sm:text-xl lg:text-2xl text-primary font-normal">VINISTE A DESPERTAR DENTRO DE ÉL.</p>
        </div>
        <p className="hero-desc text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
          Un método de transformación emocional, autoconocimiento e integración para quienes están listos para comenzar un proceso diferente.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
          <Button asChild size="lg" className="rounded-full px-8 w-full sm:w-auto">
            <a href="#terapia">CONOCER TERAPIA DEL CAOS</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">HABLAR CON JR</a>
          </Button>
        </div>
        <p className="hero-tags text-[10px] lg:text-xs tracking-[0.25em] text-muted-foreground/60 leading-relaxed pt-4 border-t border-border w-full max-w-2xl">
          WAKE UP® · RESPIRACIÓN · AUTOSANACIÓN · CONCIENCIA · INTEGRACIÓN · DESPERTARES
        </p>
      </div>
    </section>
  )
}
