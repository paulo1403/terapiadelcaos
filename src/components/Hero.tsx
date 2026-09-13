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

        <div className="hero-copy">
          <span className="hero-eyebrow eyebrow-pill">
            <span className="hero-dot" />
            {content['hero.eyebrow'] ?? 'JR Rivera · Terapeuta · Desde 2012'}
          </span>

          <h1 className="hero-title">
            <span className="hero-line">{content['hero.title1'] ?? 'Terapeuta'}</span>
            <span className="hero-line block-accent">{content['hero.title2'] ?? 'del caos'}</span>
          </h1>

          <div className="hero-tail">
            <div>
              <p className="hero-lead">
                {content['hero.lead1'] ?? 'No viniste a controlar el caos.'}
                <br />
                <span className="block-accent">
                  {content['hero.lead2'] ?? 'Viniste a despertar dentro de él.'}
                </span>
              </p>
              <p className="hero-sub">
                {content['hero.subtitle'] ??
                  'Transformación emocional e integración. Para quienes están listos para un proceso diferente — con presencia y acompañamiento real.'}
              </p>

              <div className="hero-ctas">
                <a href="#terapia" className="btn btn-primary">
                  {content['hero.cta1'] ?? 'CONOCER TERAPIA DEL CAOS'}
                </a>
                <button type="button" className="btn btn-outline" onClick={() => setHistoria(true)}>
                  {content['hero.cta2'] ?? 'VER HISTORIA JR'}
                </button>
              </div>

              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hero-wa">
                Hablar con JR por WhatsApp →
              </a>
            </div>

            <dl className="hero-stats">
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
        <div className="modal-media">
          <p className="modal-quote">“No me curaron, me enseñaron a sostenerme.”</p>
        </div>
      </Modal>
    </section>
  )
}
