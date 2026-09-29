import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'
import { WHATSAPP_LINK } from '../content/site'

const items = [
  {
    name: 'buscas',
    required: true,
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
    required: true,
    prompt: '¿Cómo prefieres el acompañamiento?',
    description: 'Esto nos ayuda a recomendarte el camino adecuado.',
    choices: [
      { value: 'acompanado', label: 'Acompañamiento continuo + comunidad' },
      { value: 'puntual2', label: 'Solo sesión virtual o presencial' },
      { value: 'intensivo', label: 'Inmersión con preparación e integración' },
    ],
  },
] as const

type Camino = 'wakeup' | 'sanacion' | 'ayahuasca'

export function Quiz() {
  const [result, setResult] = useState<Camino | null>(null)

  const waText: Record<Camino, string> = {
    wakeup: 'Hola JR, hice el quiz y me recomendaron WAKE UP (4 meses). Quisiera información.',
    sanacion: 'Hola JR, hice el quiz y me recomendaron Sesión de Sanación Emocional. Quisiera reservar.',
    ayahuasca: 'Hola JR, hice el quiz y me recomendaron Terapia del Caos + Ayahuasca. Quisiera información sobre criterios de seguridad.',
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  if (result) {
    return (
      <section className="py-16 px-5 lg:px-8 bg-muted/20 view-animate-[--quiz] animate-slide-in-bottom animate-range-[entry_5%_cover_15%]">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border overflow-hidden">
            <CardContent className="pt-6">
              <div className="rounded-xl border p-6 text-center">
                <p className="text-xs tracking-[0.2em] text-muted-foreground">TE RECOMIENDO</p>
                <p className="font-display text-xl lg:text-2xl text-foreground mt-2">
                  {result === 'wakeup' ? 'WAKE UP® — 4 meses' : result === 'sanacion' ? 'Sesión de Sanación' : 'Terapia del Caos + Ayahuasca'}
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  {result === 'wakeup' ? 'Proceso sostenido con mentoría 24/7 y comunidad.' : result === 'sanacion' ? '1 sesión para trabajar un tema concreto.' : 'Experiencia intensiva con evaluación previa e integración.'}
                </p>
                <Button asChild className="mt-4 rounded-full">
                  <a href={WHATSAPP_LINK + '?text=' + encodeURIComponent(waText[result])} target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
                </Button>
              </div>
              <div className="flex justify-center gap-3 mt-6">
                <Button variant="outline" className="rounded-full" onClick={() => setResult(null)}>Repetir quiz</Button>
                <Button variant="ghost" className="rounded-full" onClick={() => setResult(null)}>Volver</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-5 lg:px-8 bg-muted/20">
      <div className="max-w-2xl mx-auto">
        <Card className="border-border p-6">
          <div className="text-center mb-4">
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground">QUIZ · 30 SEG</p>
            <h2 className="font-display text-xl lg:text-2xl mt-1">¿No sabes por dónde empezar?</h2>
            <p className="text-sm text-muted-foreground">2 preguntas → te digo qué camino va contigo</p>
          </div>
          <Questionnaire items={items} onSubmit={handleSubmit}>
            <QuestionnaireProgress />
            {items.map((q) => (
              <QuestionnaireItem key={q.name} name={q.name} required={q.required}>
                <QuestionnaireTitle>{q.prompt}</QuestionnaireTitle>
                <QuestionnaireDescription>{q.description}</QuestionnaireDescription>
                <QuestionnaireChoices>
                  {q.choices.map((c) => (
                    <QuestionnaireChoice key={c.value} value={c.value}>
                      <span className="font-medium">{c.label}</span>
                    </QuestionnaireChoice>
                  ))}
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
            ))}
            <QuestionnaireActions>
              <QuestionnairePrevious>Anterior</QuestionnairePrevious>
              <QuestionnaireNext>Siguiente</QuestionnaireNext>
              <QuestionnaireSubmit>Ver recomendación</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        </Card>
      </div>
    </section>
  )
}
