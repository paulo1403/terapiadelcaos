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
        <div className="max-w-2xl">
          <span className="eyebrow-pill">Despertares</span>
          <h2 className="display mt-6 text-[clamp(2.6rem,7vw,5rem)]">
            Experiencias que
            <br />
            <span className="text-primary">te atraviesan.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Inmersivas. Preparación + presencia + integración.
            <span className="font-medium text-foreground"> No es evento, es proceso.</span>
          </p>
        </div>

        <div className="mt-14 flex flex-col">
          {EVENTOS.map((e) => {
            const rango = e.fechaFin ? `${fmt(e.fechaInicio)} — ${fmt(e.fechaFin)}` : fmt(e.fechaInicio)
            const msg =
              'Hola JR, vi la página y me interesa la experiencia de ' +
              e.ciudad +
              (e.fechaInicio ? ' del ' + rango : '') +
              '. ¿Información del proceso?'
            const destacado = e.ciudad === 'Piura'
            return (
              <div
                key={e.ciudad}
                className="group grid grid-cols-1 gap-4 border-t border-border py-9 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-10 [&:last-child]:border-b"
              >
                <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                  <p className="display text-3xl leading-none md:text-4xl">{e.ciudad}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{rango}</p>
                </div>
                <div>
                  <h3 className="display text-2xl leading-tight md:text-3xl">
                    {e.nombre}
                    {destacado && (
                      <span className="ml-3 align-middle text-[10px] uppercase tracking-widest text-primary">
                        · {e.cupos ?? ''} cupos
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {e.descripcion}
                  </p>
                </div>
                <a
                  href={whatsappMessage(msg)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium transition-opacity hover:opacity-90 ${
                    destacado ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground'
                  }`}
                >
                  {destacado ? 'RESERVAR' : 'PEDIR INFO'}
                </a>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Despertar individual · Grupal · Retiros · Medicina ancestral
        </p>
      </div>
    </section>
  )
}
