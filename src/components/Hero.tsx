import { BRAND, WHATSAPP_LINK } from '../content/site'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 bg-aurora overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_60%,rgba(232,182,89,0.10),transparent)]" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-amber/80 text-sm tracking-[0.4em] mb-6">{BRAND.program}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-gold-gradient leading-tight">
          {BRAND.name}
        </h1>
        <p className="mt-8 text-xl sm:text-2xl text-text/90 font-light leading-relaxed">
          NO VINISTE A CONTROLAR EL CAOS.
          <br />
          <span className="text-gold">VINISTE A DESPERTAR DENTRO DE EL.</span>
        </p>
        <p className="mt-6 text-muted max-w-xl mx-auto">
          Un metodo de transformacion emocional, autoconocimiento e integracion para
          quienes estan listos para comenzar un proceso diferente.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#terapia"
            className="px-7 py-3 rounded-full bg-gold text-ink font-semibold hover:bg-gold-bright transition-colors"
          >
            CONOCER TERAPIA DEL CAOS
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold/10 transition-colors"
          >
            HABLAR CON JR
          </a>
        </div>
        <p className="mt-10 text-xs tracking-[0.3em] text-muted">
          WAKE UP(r) · RESPIRACION · AUTOSANACION · CONCIENCIA · INTEGRACION · DESPERTARES
        </p>
      </div>
    </section>
  )
}
