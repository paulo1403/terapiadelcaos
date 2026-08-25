import { EVENTOS, whatsappMessage } from '../content/site'

function fmt(f: string): string {
  if (!f) return 'Fecha configurable'
  const d = new Date(f + 'T00:00:00')
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function Despertares() {
  return (
    <section id="despertares" className="py-24 px-5 bg-aurora">
      <div className="max-w-5xl mx-auto">
        <p className="text-amber/80 text-sm tracking-[0.3em] mb-4">DESPERTARES</p>
        <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-4">
          EXPERIENCIAS DE CONCIENCIA, TRANSFORMACION E INTEGRACION
        </h2>
        <p className="text-muted max-w-2xl text-lg mb-12">
          Son experiencias inmersivas disenadas alrededor de preparacion, presencia,
          exploracion interior e integracion.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {EVENTOS.map((e) => {
            const rango = e.fechaFin ? fmt(e.fechaInicio) + ' - ' + fmt(e.fechaFin) : fmt(e.fechaInicio)
            const msg = 'Hola JR, vi la pagina de Terapia del Caos y estoy interesado/a en la experiencia de ' + e.ciudad + (e.fechaInicio ? ' del ' + rango : '') + '. Quisiera recibir informacion sobre el proceso.'
            return (
              <article key={e.ciudad} className="glass rounded-2xl p-7 flex flex-col">
                <span className="text-gold/60 text-xs tracking-widest">{e.ciudad.toUpperCase()}</span>
                <h3 className="font-display text-xl text-gold mt-2">{e.nombre}</h3>
                <p className="text-muted text-sm mt-2">{rango}</p>
                <p className="text-muted text-sm mt-3 flex-1">{e.descripcion}</p>
                <a
                  href={whatsappMessage(msg)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-center px-6 py-2.5 rounded-full bg-gold text-ink text-sm font-semibold hover:bg-gold-bright transition-colors"
                >
                  RESERVAR / INFORMACION
                </a>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-muted text-center">
          Categorias: Despertar individual · Despertar grupal · Retiros · Experiencias con medicina ancestral
        </p>
      </div>
    </section>
  )
}
