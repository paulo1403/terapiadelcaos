import { WA } from '../lib/wa'

const PASOS = [
  { n: '01', t: 'Sentir', d: 'Volver al cuerpo.' },
  { n: '02', t: 'Comprender', d: 'Ver el patrón.' },
  { n: '03', t: 'Liberar', d: 'Soltar lo que pesa.' },
  { n: '04', t: 'Integrar', d: 'Hacerlo vida.' },
  { n: '05', t: 'Despertar', d: 'Elegir consciente.' },
]

export function Terapia() {
  return (
    <section id="terapia" className="section">
      <div className="shell terapia">
        <div className="terapia-intro">
          <span className="eyebrow-pill">Terapia del Caos</span>
          <h2 className="terapia-title">
            <span className="terapia-kicker">El caos no es tu enemigo.</span>
            <span className="block-accent">Es</span>
            <span>información.</span>
          </h2>
          <p className="terapia-lead">
            Relaciones, pérdidas, crisis. Cuando todo se desordena, no siempre hay que escapar.
            <strong> A veces hay que atravesarlo — con presencia.</strong>
          </p>
          <p className="terapia-note">
            No estás solo en esto. Te acompaño a mirar el caos como proceso, no como falla.
          </p>
          <a
            href={WA('Hola JR, me interesa Terapia del Caos. Quiero atravesar mi proceso con acompañamiento.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary terapia-cta"
          >
            QUIERO ATRAVESARLO
          </a>
        </div>

        <div>
          <div className="steps-head">
            <span>Proceso en 5 pasos</span>
            <span />
          </div>

          <ol>
            {PASOS.map((p, i) => (
              <li key={p.n}>
                <div className="step">
                  <span className="step-num">{p.n}</span>
                  <div>
                    <h3 className="step-title">{p.t}</h3>
                    <p className="step-desc">{p.d}</p>
                  </div>
                </div>
                {i < PASOS.length - 1 && <span className="hairline" />}
              </li>
            ))}
          </ol>

          <p className="steps-note">
            No es un lineal perfecto. <strong>Es un espiral.</strong> Vuelves, pero más consciente.
          </p>
        </div>
      </div>
    </section>
  )
}
