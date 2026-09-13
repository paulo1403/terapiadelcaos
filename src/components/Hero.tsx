import { useState } from 'react'
import { WHATSAPP_LINK } from '../content/site'
import { Modal } from '@/components/ui/Modal'
import heroDesktop from '../assets/hero-immersive-desktop.png'
import heroMobile from '../assets/hero-immersive-mobile.png'
import { useSite } from '../lib/site'

export function Hero() {
  const { content } = useSite()
  const [historia, setHistoria] = useState(false)

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

        <div className="hero-copy relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 lg:px-10 lg:pb-28">
          <span className="hero-eyebrow eyebrow-pill">
            <span className="size-1.5 rounded-full bg-primary" />
            {content['hero.eyebrow'] ?? 'JR Rivera · Terapeuta · Desde 2012'}
          </span>

          <h1 className="mt-6 font-display leading-[0.84] tracking-[-0.03em] text-[clamp(3.25rem,12vw,9rem)]">
            <span className="hero-line block">{content['hero.title1'] ?? 'Terapeuta'}</span>
            <span className="hero-line block text-primary">
              {content['hero.title2'] ?? 'del caos'}
            </span>
          </h1>

          <div className="hero-tail mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-2xl leading-snug sm:text-3xl">
                {content['hero.lead1'] ?? 'No viniste a controlar el caos.'}
                <br />
                <span className="text-primary">
                  {content['hero.lead2'] ?? 'Viniste a despertar dentro de él.'}
                </span>
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#efe9df]/70">
                {content['hero.subtitle'] ??
                  'Transformación emocional e integración. Para quienes están listos para un proceso diferente — con presencia y acompañamiento real.'}
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href="#terapia" className="btn btn-primary">
                  {content['hero.cta1'] ?? 'CONOCER TERAPIA DEL CAOS'}
                </a>
                <button type="button" className="btn btn-outline" onClick={() => setHistoria(true)}>
                  {content['hero.cta2'] ?? 'VER HISTORIA JR'}
                </button>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs tracking-wide text-[#efe9df]/70 underline underline-offset-4 transition-colors hover:text-primary"
              >
                Hablar con JR por WhatsApp →
              </a>
            </div>

            <dl className="hero-stats w-full max-w-sm lg:max-w-xs lg:text-right">
              <div className="hero-stat">
                <dt>12</dt>
                <dd>años</dd>
              </div>
              <div className="hero-stat">
                <dt>+500</dt>
                <dd>procesos</dd>
              </div>
              <div className="hero-stat">
                <dt>4.9</dt>
                <dd>valoración</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="hero-cue" aria-hidden="true">
          Scroll
        </div>
      </div>

      <Modal open={historia} onClose={() => setHistoria(false)} title="Historia JR">
        <div className="flex aspect-video items-center justify-center p-6">
          <p className="max-w-md text-center font-display text-2xl leading-snug">
            “No me curaron, me enseñaron a sostenerme.”
          </p>
        </div>
      </Modal>
    </section>
  )
}
