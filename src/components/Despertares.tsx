import { EVENTOS, whatsappMessage } from '../content/site'

function fmt(f: string) {
  if (!f) return 'Fecha por confirmar'
  const d = new Date(f + 'T00:00:00')
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function Despertares() {
  return (
    <section id="despertares" className="section">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow-pill">Despertares</span>
          <h2 className="h2 h2-big">
            Experiencias que
            <br />
            <span className="block-accent">te atraviesan.</span>
          </h2>
          <p className="lead">
            Inmersivas. Preparación + presencia + integración.
            <strong> No es evento, es proceso.</strong>
          </p>
        </div>

        <div className="events">
          {EVENTOS.map((e) => {
            const rango = e.fechaFin ? `${fmt(e.fechaInicio)} — ${fmt(e.fechaFin)}` : fmt(e.fechaInicio)
            const msg =
              'Hola JR, vi la página y me interesa la experiencia de ' +
              e.ciudad +
              (e.fechaInicio ? ' del ' + rango : '') +
              '. ¿Información del proceso?'
            const destacado = e.ciudad === 'Piura'
            return (
              <div key={e.ciudad} className="event">
                <div>
                  <p className="event-city">{e.ciudad}</p>
                  <p className="event-date">{rango}</p>
                </div>
                <div>
                  <h3 className="event-name">
                    {e.nombre}
                    {destacado && <span className="event-cupos">· {e.cupos ?? ''} cupos</span>}
                  </h3>
                  <p className="event-desc">{e.descripcion}</p>
                </div>
                <a
                  href={whatsappMessage(msg)}
                  target="_blank"
                  rel="noreferrer"
                  className={`event-cta ${destacado ? 'primary' : 'outline'}`}
                >
                  {destacado ? 'RESERVAR' : 'PEDIR INFO'}
                </a>
              </div>
            )
          })}
        </div>

        <p className="events-note">
          Despertar individual · Grupal · Retiros · Medicina ancestral
        </p>
      </div>
    </section>
  )
}
