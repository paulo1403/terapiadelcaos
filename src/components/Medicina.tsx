import { WA } from '../lib/wa'

const PASOS = [
  { n: '01', t: 'Preparación', d: 'Intención + seguridad.' },
  { n: '02', t: 'Experiencia', d: 'Acompañado, presente.' },
  { n: '03', t: 'Integración', d: 'Lo vivido a la vida.' },
]

export function Medicina() {
  return (
    <section className="section">
      <div className="shell">
        <div className="section-head-wide">
          <span className="eyebrow-pill">Medicina ancestral</span>
          <h2 className="h2 med-title">Ayahuasca</h2>
          <p className="lead">
            Preparación amazónica de introspección intensa.{' '}
            <strong>No es magia. No sustituye terapia.</strong> Requiere preparación e integración.
          </p>
        </div>

        <div className="med-steps">
          {PASOS.map((p) => (
            <div key={p.n} className="med-step card-hover">
              <span className="med-step-num">{p.n}</span>
              <p className="med-step-title">{p.t}</p>
              <p className="step-desc">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="med-quote">
          La experiencia termina. <span className="block-accent">La integración comienza.</span>
        </p>

        <div className="med-safety">
          <div className="grow">
            <p className="body-sm">
              <strong>Responsabilidad primero</strong>
            </p>
            <p className="note">
              Evalúa antecedentes médicos, psicológicos y medicamentos. No suspendas fármacos por tu
              cuenta. Sujeto a evaluación previa.
            </p>
          </div>
          <a
            href={WA('Hola JR, quiero información sobre criterios de seguridad para Ayahuasca.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline shrink-0"
          >
            Consultar
          </a>
        </div>
      </div>
    </section>
  )
}
