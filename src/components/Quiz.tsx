import { useState } from 'react'
import type { FormEvent } from 'react'
import { WHATSAPP_LINK } from '../content/site'

const items = [
  {
    name: 'buscas',
    prompt: '¿Qué buscas ahora?',
    description: 'Elige la opción que más resuena contigo.',
    choices: [
      { value: 'proceso', label: 'Quiero un proceso completo y sostenido (4 meses)' },
      { value: 'puntual', label: 'Quiero trabajar un tema puntual en 1 sesión' },
      { value: 'experiencia', label: 'Quiero una experiencia intensiva de exploración' },
    ],
  },
  {
    name: 'acompanamiento',
    prompt: '¿Cómo prefieres el acompañamiento?',
    description: 'Esto nos ayuda a recomendarte el camino adecuado.',
    choices: [
      { value: 'acompanado', label: 'Acompañamiento continuo + comunidad' },
      { value: 'puntual2', label: 'Solo sesión virtual o presencial' },
      { value: 'intensivo', label: 'Inmersión con preparación e integración' },
    ],
  },
]

type Camino = 'wakeup' | 'sanacion' | 'ayahuasca'

export function Quiz() {
  const [result, setResult] = useState<Camino | null>(null)

  const waText: Record<Camino, string> = {
    wakeup: 'Hola JR, hice el quiz y me recomendaron WAKE UP (4 meses). Quisiera información.',
    sanacion: 'Hola JR, hice el quiz y me recomendaron Sesión de Sanación Emocional. Quisiera reservar.',
    ayahuasca:
      'Hola JR, hice el quiz y me recomendaron Terapia del Caos + Ayahuasca. Quisiera información sobre criterios de seguridad.',
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const buscas = fd.get('buscas') as string | null
    const acomp = fd.get('acompanamiento') as string | null
    let r: Camino = 'sanacion'
    if (buscas === 'proceso') r = 'wakeup'
    else if (buscas === 'puntual') r = 'sanacion'
    else if (buscas === 'experiencia') r = 'ayahuasca'
    else if (acomp === 'intensivo') r = 'ayahuasca'
    else if (acomp === 'acompanado') r = 'wakeup'
    setResult(r)
  }

  const titulo =
    result === 'wakeup'
      ? 'WAKE UP® — 4 meses'
      : result === 'sanacion'
        ? 'Sesión de Sanación'
        : 'Terapia del Caos + Ayahuasca'
  const detalle =
    result === 'wakeup'
      ? 'Proceso sostenido con mentoría 24/7 y comunidad.'
      : result === 'sanacion'
        ? '1 sesión para trabajar un tema concreto.'
        : 'Experiencia intensiva con evaluación previa e integración.'

  return (
    <section className="section">
      <div className="quiz">
        {result ? (
          <div className="card quiz-card quiz-result">
            <p className="quiz-result-label">Te recomiendo</p>
            <p className="quiz-result-title">{titulo}</p>
            <p className="quiz-result-desc">{detalle}</p>
            <div className="quiz-actions">
              <a
                href={WHATSAPP_LINK + '?text=' + encodeURIComponent(waText[result])}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Hablar por WhatsApp
              </a>
              <button type="button" className="btn btn-outline" onClick={() => setResult(null)}>
                Repetir quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="card quiz-card">
            <div>
              <p className="quiz-eyebrow">QUIZ · 30 SEG</p>
              <h2 className="quiz-title">¿No sabes por dónde empezar?</h2>
              <p className="quiz-sub">2 preguntas → te digo qué camino va contigo</p>
            </div>

            <form onSubmit={handleSubmit} className="quiz-form">
              {items.map((q) => (
                <fieldset key={q.name} className="quiz-fieldset">
                  <legend className="quiz-legend">{q.prompt}</legend>
                  <p className="quiz-desc">{q.description}</p>
                  <div className="quiz-choices">
                    {q.choices.map((c) => (
                      <label key={c.value} className="choice">
                        <input type="radio" name={q.name} value={c.value} required />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button type="submit" className="btn btn-primary full">
                Ver recomendación
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
