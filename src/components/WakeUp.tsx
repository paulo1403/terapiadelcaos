import { HOTMART, WHATSAPP_LINK } from '../content/site'

function Cta({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn btn-outline btn-primary rounded-full mt-5">{label}</a>
  )
}

export function WakeUp() {
  return (
    <section id="wakeup" className="py-24 px-5 bg-base-200">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent text-sm tracking-[0.3em] mb-4">WAKE UP(r)</p>
        <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-6">EL PROGRAMA DE AUTOSANACION EMOCIONAL</h2>
        <p className="text-base-content/60 max-w-2xl text-lg">
          WAKE UP es un proceso estructurado de transformacion personal que integra herramientas
          de conciencia emocional, respiracion, trabajo corporal, introspeccion, autoconocimiento
          e integracion.
        </p>
        <div className="mt-10 flex flex-wrap gap-2 text-xs text-base-content/60">
          {['Respiracion consciente','Breathwork','Trabajo emocional','Conciencia corporal','Meditacion','Psicoeducacion','Autoconocimiento','Exploracion de patrones','Creencias','Integracion','Herramientas de autosanacion'].map((h) => (
            <span key={h} className="badge badge-outline border-primary/20">{h}</span>
          ))}
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="card bg-base-100 border border-primary/10">
            <div className="card-body">
              <h3 className="font-display text-xl text-primary">WAKE UP PRIME</h3>
              <p className="text-base-content/60 text-sm mt-3">Programa profundo de acompanamiento.</p>
              <Cta href={WHATSAPP_LINK} label="QUIERO INFORMACION" />
            </div>
          </div>
          <div className="card bg-base-100 border border-primary/10">
            <div className="card-body">
              <h3 className="font-display text-xl text-primary">WAKE UP LIGHT</h3>
              <p className="text-base-content/60 text-sm mt-3">Puerta de entrada al proceso.</p>
              <Cta href={HOTMART.wakeup || WHATSAPP_LINK} label="CONOCER PROGRAMA" />
            </div>
          </div>
          <div className="card bg-base-100 border border-primary/10">
            <div className="card-body">
              <h3 className="font-display text-xl text-primary">WAKE UP MENTORIA</h3>
              <p className="text-base-content/60 text-sm mt-3">Proceso de acompanamiento con comunidad, seguimiento y practicas.</p>
              <Cta href={HOTMART.mentoria || WHATSAPP_LINK} label="QUIERO ENTRAR A WAKE UP" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
