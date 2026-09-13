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
      <div className="shell max-w-3xl">
        {result ? (
          <div className="card p-8 text-center lg:p-12">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Te recomiendo</p>
            <p className="display mt-3 text-3xl lg:text-4xl">{titulo}</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{detalle}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
          <div className="card p-7 lg:p-10">
            <div className="text-center">
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground">QUIZ · 30 SEG</p>
              <h2 className="display mt-2 text-3xl">¿No sabes por dónde empezar?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                2 preguntas → te digo qué camino va contigo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
              {items.map((q) => (
                <fieldset key={q.name} className="flex flex-col gap-4 border-0 p-0">
                  <legend className="display text-xl">{q.prompt}</legend>
                  <p className="-mt-2 text-sm text-muted-foreground">{q.description}</p>
                  <div className="flex flex-col gap-3">
                    {q.choices.map((c) => (
                      <label key={c.value} className="choice">
                        <input type="radio" name={q.name} value={c.value} required />
                        <span className="text-sm">{c.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button type="submit" className="btn btn-primary w-full">
                Ver recomendación
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
