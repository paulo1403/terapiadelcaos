import { EVENTOS, whatsappMessage } from '../content/site'

function fmt(f: string) {
  if (!f) return 'Fecha por confirmar'
  const d = new Date(f + 'T00:00:00')
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function Despertares() {
  return (
    <section id="despertares" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Despertares</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.02em]">
            Experiencias que
            <br />
            <span className="text-primary">te atraviesan.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Inmersivas. Preparación + presencia + integración.
            <span className="font-medium text-foreground"> No es evento, es proceso.</span>
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
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
                className="grid grid-cols-1 gap-4 py-7 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {e.ciudad}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{rango}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-tight">
                    {e.nombre}
                    {destacado && <span className="ml-3 align-middle text-[10px] uppercase tracking-widest text-primary">· {e.cupos ?? ''} cupos</span>}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {e.descripcion}
                  </p>
                </div>
                <a
                  href={whatsappMessage(msg)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90 ${
                    destacado ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground'
                  }`}
                >
                  {destacado ? 'RESERVAR' : 'PEDIR INFO'}
                </a>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Despertar individual · Grupal · Retiros · Medicina ancestral
        </p>
      </div>
    </section>
  )
}
