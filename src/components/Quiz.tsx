import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { WHATSAPP_LINK } from '../content/site'
import { ArrowRight } from 'lucide-react'

type Camino = 'wakeup' | 'sanacion' | 'ayahuasca' | null

export function Quiz() {
  const [q1, setQ1] = useState<string>('')
  const [q2, setQ2] = useState<string>('')
  const [result, setResult] = useState<Camino>(null)

  const recommend = () => {
    if (q1 === 'proceso') setResult('wakeup')
    else if (q1 === 'puntual') setResult('sanacion')
    else if (q1 === 'experiencia') setResult('ayahuasca')
    else if (q2 === 'intensivo') setResult('ayahuasca')
    else if (q2 === 'acompanado') setResult('wakeup')
    else setResult('sanacion')
  }

  const waText: Record<string, string> = {
    wakeup: 'Hola JR, hice el quiz y me recomendaron WAKE UP (4 meses). Quisiera información.',
    sanacion: 'Hola JR, hice el quiz y me recomendaron Sesión de Sanación Emocional. Quisiera reservar.',
    ayahuasca: 'Hola JR, hice el quiz y me recomendaron Terapia del Caos + Ayahuasca. Quisiera información sobre criterios de seguridad.',
  }

  return (
    <section className="py-12 px-5 lg:px-8 bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-xl">¿No sabes por dónde empezar?</CardTitle>
            <p className="text-sm text-muted-foreground">2 preguntas → te digo qué camino va contigo</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">1. ¿Qué buscas ahora?</Label>
              <RadioGroup value={q1} onValueChange={setQ1} className="gap-2">
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="proceso" id="q1a" /><Label htmlFor="q1a" className="flex-1 cursor-pointer">Quiero un proceso completo y sostenido (4 meses)</Label></div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="puntual" id="q1b" /><Label htmlFor="q1b" className="flex-1 cursor-pointer">Quiero trabajar un tema puntual en 1 sesión</Label></div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="experiencia" id="q1c" /><Label htmlFor="q1c" className="flex-1 cursor-pointer">Quiero una experiencia intensiva de exploración</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">2. ¿Cómo prefieres el acompañamiento?</Label>
              <RadioGroup value={q2} onValueChange={setQ2} className="gap-2">
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="acompanado" id="q2a" /><Label htmlFor="q2a" className="flex-1 cursor-pointer">Acompañamiento continuo + comunidad</Label></div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="puntual2" id="q2b" /><Label htmlFor="q2b" className="flex-1 cursor-pointer">Solo sesión virtual o presencial</Label></div>
                <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent"><RadioGroupItem value="intensivo" id="q2c" /><Label htmlFor="q2c" className="flex-1 cursor-pointer">Inmersión con preparación e integración</Label></div>
              </RadioGroup>
            </div>
            {result && (
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-center">
                <p className="text-sm text-muted-foreground">Te recomiendo</p>
                <p className="font-display text-lg text-primary mt-1">{result === 'wakeup' ? 'WAKE UP® — 4 meses' : result === 'sanacion' ? 'Sesión de Sanación' : 'Terapia del Caos + Ayahuasca'}</p>
                <Button asChild className="mt-3 rounded-full w-full sm:w-auto">
                  <a href={WHATSAPP_LINK + '?text=' + encodeURIComponent(waText[result])} target="_blank" rel="noreferrer">Hablar por WhatsApp <ArrowRight className="w-4 h-4 ml-1" /></a>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={recommend} disabled={!q1 || !q2} className="rounded-full px-8">Ver recomendación</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
