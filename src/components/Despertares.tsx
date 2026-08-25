import { EVENTOS, whatsappMessage } from '../content/site'

function fmt(f: string) {
  if (!f) return 'Fecha configurable'
  const d = new Date(f + 'T00:00:00')
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function Despertares() {
  return (
    <section id="despertares" className="py-24 px-5 bg-aurora">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent text-sm tracking-[0.3em] mb-4">DESPERTARES</p>
        <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-4">
          EXPERIENCIAS DE CONCIENCIA, TRANSFORMACION E INTEGRACION
        </h2>
        <p className="text-base-content/60 max-w-2xl text-lg mb-12">
          Son experiencias inmersivas disenadas alrededor de preparacion, presencia,
          exploracion interior e integracion.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {EVENTOS.map((e) => {
            const rango = e.fechaFin ? fmt(e.fechaInicio) + ' - ' + fmt(e.fechaFin) : fmt(e.fechaInicio)
            const msg = 'Hola JR, vi la pagina de Terapia del Caos y estoy interesado/a en la experiencia de ' + e.ciudad + (e.fechaInicio ? ' del ' + rango : '') + '. Quisiera recibir informacion sobre el proceso.'
            return (
              <article key={e.ciudad} className="card bg-base-100 border border-primary/10">
                <div className="card-body">
                  <span className="text-primary/60 text-xs tracking-widest">{e.ciudad.toUpperCase()}</span>
                  <h3 className="font-display text-xl text-primary mt-2">{e.nombre}</h3>
                  <p className="text-base-content/60 text-sm mt-2">{rango}</p>
                  <p className="text-base-content/60 text-sm mt-3 flex-1">{e.descripcion}</p>
                  <a href={whatsappMessage(msg)} target="_blank" rel="noreferrer" className="btn btn-primary rounded-full mt-5">RESERVAR / INFORMACION</a>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-10 text-sm text-base-content/50 text-center">
          Categorias: Despertar individual · Despertar grupal · Retiros · Experiencias con medicina ancestral
        </p>
      </div>
    </section>
  )
}
