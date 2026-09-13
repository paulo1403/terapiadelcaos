import { WHATSAPP_LINK } from '../content/site'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import heroDesktop from '../assets/hero-immersive-desktop.png'
import heroMobile from '../assets/hero-immersive-mobile.png'
import { useSite } from '../lib/site'

export function Hero() {
  const { content } = useSite()

  return (
    <section id="inicio" className="hero">
      <div className="hero-stage">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile} />
          <img src={heroDesktop} alt="" aria-hidden="true" className="hero-media" />
        </picture>
        <div className="hero-vignette" />
        <div className="hero-gradient" />
        <div className="hero-grain bg-grain" />

        <div className="hero-copy relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <p className="hero-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-[#c9c2b6]/80">
            {content['hero.eyebrow'] ?? 'JR Rivera · Terapeuta · Desde 2012'}
          </p>

          <h1 className="mt-5 font-display leading-[0.86] tracking-[-0.02em] text-[clamp(3rem,11vw,8.5rem)]">
            <span className="hero-line block">{content['hero.title1'] ?? 'Terapeuta'}</span>
            <span className="hero-line block text-primary">
              {content['hero.title2'] ?? 'del caos'}
            </span>
          </h1>

          <div className="hero-tail mt-10 grid max-w-3xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <p className="font-display text-2xl leading-snug sm:text-3xl">
                {content['hero.lead1'] ?? 'No viniste a controlar el caos.'}
                <br />
                <span className="text-primary">
                  {content['hero.lead2'] ?? 'Viniste a despertar dentro de él.'}
                </span>
              </p>
              <p className="max-w-md text-sm leading-relaxed text-[#efe9df]/70">
                {content['hero.subtitle'] ??
                  'Transformación emocional e integración. Para quienes están listos para un proceso diferente — con presencia y acompañamiento real.'}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild size="lg" className="h-12 rounded-full px-8 text-[13px] tracking-wide">
                  <a href="#terapia">{content['hero.cta1'] ?? 'CONOCER TERAPIA DEL CAOS'}</a>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-[#efe9df]/25 bg-transparent px-8 text-[13px] tracking-wide text-[#efe9df] hover:bg-[#efe9df]/10 hover:text-[#efe9df]"
                    >
                      {content['hero.cta2'] ?? 'VER HISTORIA JR'}
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
      </div>
    </section>
  )
}
