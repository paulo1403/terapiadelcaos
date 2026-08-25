import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Heart, Leaf } from 'lucide-react'

const caminos = [
  {
    icon: Sparkles,
    kicker: " WAKE UP®",
    title: "4 MESES PARA DESPERTAR UNA NUEVA RELACIÓN CONTIGO",
    desc: "Proceso integral de 16 sesiones + mentoría 24/7 + herramientas de autosanación.",
    bullets: ["16 sesiones (4 meses)", "Mentoría 24/7", "Comunidad privada", "Integración continua"],
    cta: "CONOCER WAKE UP — CUPOS LIMITADOS",
    href: "https://wa.me/51962852987?text=" + encodeURIComponent("Hola JR, me interesa WAKE UP® 4 meses (16 sesiones + mentoría). ¿Próximo grupo?") ,
    variant: "default" as const,
  },
  {
    icon: Heart,
    kicker: "SESIONES DE SANACIÓN EMOCIONAL",
    title: "UNA SESIÓN. UN ESPACIO PARA TI.",
    desc: "Virtual o presencial. Trabaja un tema concreto con acompañamiento terapéutico.",
    bullets: ["Virtual / Presencial", "Ansiedad, relaciones, límites", "Crisis vitales", "Autoconocimiento"],
    cta: "RESERVAR SESIÓN · VIRTUAL O PRESENCIAL",
    href: "https://wa.me/51962852987?text=" + encodeURIComponent("Hola JR, quiero reservar Sesión de Sanación Emocional (virtual/presencial). ¿Disponibilidad esta semana?") ,
    variant: "secondary" as const,
  },
  {
    icon: Leaf,
    kicker: "TERAPIA DEL CAOS + AYAHUASCA",
    title: "UNA EXPERIENCIA DE DESPERTAR",
    desc: "Sesión experiencial con respiración, presencia y, cuando corresponde, medicina ancestral.",
    bullets: ["Respiración", "Presencia", "Trabajo emocional", "Integración"],
    cta: "CONOCER EXPERIENCIA · EVALUACIÓN PREVIA",
    href: "https://wa.me/51962852987?text=" + encodeURIComponent("Hola JR, me interesa Terapia del Caos + Ayahuasca. Quisiera información sobre preparación y criterios de seguridad.") ,
    variant: "outline" as const,
  },
]

export function TresCaminos() {
  return (
    <section className="py-20 px-5 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-3">¿QUÉ ESTÁS BUSCANDO?</p>
          <h2 className="font-display text-3xl lg:text-4xl text-foreground">LOS 3 CAMINOS</h2>
          <p className="text-sm text-muted-foreground mt-3">Claridad primero. Elige tu puerta de entrada al universo Terapeuta del Caos.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {caminos.map((c, i) => (
            <motion.div key={c.kicker} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Card className="h-full flex flex-col border-border hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="w-fit mt-3 text-[10px] tracking-widest">{c.kicker}</Badge>
                  <CardTitle className="font-display text-lg leading-tight mt-2">{c.title}</CardTitle>
                  <CardDescription className="text-sm">{c.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {c.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-primary">·</span>{b}</li>)}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant={c.variant === "outline" ? "outline" : "default"} className="w-full rounded-full">
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{c.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 p-4 rounded-xl bg-muted/30 border border-border">
          <p className="text-xs text-center text-muted-foreground">¿Cuál es para ti? <span className="text-foreground font-medium">WAKE UP</span> — proceso completo · <span className="text-foreground font-medium">Sanación</span> — tema puntual · <span className="text-foreground font-medium">Ayahuasca</span> — experiencia intensiva</p>
        </motion.div>
      </div>
    </section>
  )
}
