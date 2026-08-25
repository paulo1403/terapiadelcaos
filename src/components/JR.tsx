import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { WHATSAPP_LINK } from '../content/site'
import { Play, Quote } from 'lucide-react'

const TESTIMONIOS = [
  { nombre: 'María G.', ciudad: 'Lima — WAKE UP 2024', texto: 'Llegué en crisis, sin dormir. En 4 meses aprendí a respirar antes de reaccionar. No me "curaron", me enseñaron a sostenerme. Hoy duermo, pongo límites y sigo en tribu.', foto: 'https://i.pravatar.cc/100?img=5' },
  { nombre: 'Jorge C.', ciudad: 'Trujillo — Sesión individual', texto: 'Una sola sesión me dio más claridad que meses dando vueltas. JR no te dice qué hacer, te ayuda a ver qué estás repitiendo.', foto: 'https://i.pravatar.cc/100?img=12' },
  { nombre: 'Ana L.', ciudad: 'Piura — Despertar grupal', texto: 'La experiencia fue intensa, sí, pero lo que la hizo valiosa fue la integración de después. Sin eso, es solo una noche.', foto: 'https://i.pravatar.cc/100?img=9' },
]

const MANIFIESTO = ['NO HUYAS DE LO QUE SIENTES.', 'ESCUCHA.', 'RESPIRA.', 'OBSERVA.', 'COMPRENDE.', 'INTEGRA.', 'DESPIERTA.']

export function JR() {
  return (
    <section id="jr" className="py-20 px-5 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 flex flex-col items-center text-center lg:sticky lg:top-24">
            <Avatar className="w-32 h-32 border-2 border-primary/20">
              <AvatarImage src="https://i.pravatar.cc/300?img=15" alt="JR Rivera" />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-display">JR</AvatarFallback>
            </Avatar>
            <h3 className="font-display text-2xl text-primary mt-4">JR RIVERA</h3>
            <p className="text-sm text-muted-foreground">Psicólogo · Psicoterapeuta · Facilitador</p>
            <p className="text-xs text-muted-foreground mt-1">12 años · +500 procesos acompañados</p>
            <Button variant="outline" className="rounded-full mt-4" onClick={() => (document.getElementById('jr-video') as HTMLDialogElement)?.showModal()}>
              <Play className="w-4 h-4 mr-1" /> VER VIDEO — QUIÉN SOY
            </Button>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xs tracking-[0.3em] text-muted-foreground">YO TAMBIÉN CONOCÍ EL CAOS</p>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Mi camino no empezó en un consultorio. Empezó en el dolor, en la búsqueda, en el aprendizaje, en la transformación y, finalmente, en la creación de Terapia del Caos.</p>
              <p className="text-foreground font-medium">No creé Terapia del Caos porque tuviera todas las respuestas. La creé porque aprendí a hacer mejores preguntas.</p>
              <p>Hoy acompaño procesos donde la persona no es un paciente que hay que arreglar, sino un ser humano atravesando su caos conscientemente — con herramientas, respiración, presencia e integración.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 rounded-xl bg-muted/30 border"><p className="font-display text-xl text-primary">+500</p><p className="text-xs text-muted-foreground">procesos</p></div>
              <div className="text-center p-3 rounded-xl bg-muted/30 border"><p className="font-display text-xl text-primary">12</p><p className="text-xs text-muted-foreground">años</p></div>
              <div className="text-center p-3 rounded-xl bg-muted/30 border"><p className="font-display text-xl text-primary">4.9</p><p className="text-xs text-muted-foreground">valoración</p></div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-foreground text-background text-center">
          <div className="space-y-2 font-display text-xl lg:text-2xl">
            {MANIFIESTO.map((m, i) => (
              <p key={i} className="opacity-0 animate-[fadeIn_0.6s_ease_forwards]" style={{ animationDelay: i * 0.2 + 's' }}>{m}</p>
            ))}
          </div>
          <p className="mt-8 font-display text-sm tracking-widest opacity-70">TERAPIA DEL CAOS</p>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Historias reales</h3>
            <span className="text-xs text-muted-foreground">Con autorización · anonimizadas</span>
          </div>
          <div className="mt-4 rounded-xl overflow-hidden border bg-card">
            <div className="aspect-video bg-muted flex items-center justify-center relative group cursor-pointer" onClick={() => (document.getElementById('jr-video') as HTMLDialogElement)?.showModal()}>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-105 transition-transform"><Play className="w-6 h-6 ml-0.5" /></div>
              <p className="absolute bottom-3 left-3 text-xs bg-background/80 px-2 py-1 rounded-full">María — "No me curaron, me enseñaron a sostenerme" (1:47)</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            {TESTIMONIOS.map((t) => (
              <Card key={t.nombre} className="border-border">
                <CardContent className="pt-6">
                  <Quote className="w-5 h-5 text-primary/30" />
                  <p className="text-sm mt-2 leading-relaxed">“{t.texto}”</p>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="w-9 h-9"><AvatarImage src={t.foto} /><AvatarFallback>{t.nombre[0]}</AvatarFallback></Avatar>
                    <div className="text-xs"><p className="font-medium">{t.nombre}</p><p className="text-muted-foreground">{t.ciudad}</p></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <p className="font-display text-lg">¿Listo para comenzar?</p>
          <p className="text-sm opacity-90 mt-1">Elige tu camino o habla directamente — respondo en menos de 2h</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Button variant="secondary" asChild className="rounded-full"><a href="#audiolibros">Desde casa — 21 audiolibros</a></Button>
            <Button variant="outline" asChild className="rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Hablar con JR</a></Button>
          </div>
        </div>
      </div>

      <dialog id="jr-video" className="modal">
        <div className="modal-box max-w-3xl bg-card">
          <h3 className="font-display text-lg">Conoce a JR</h3>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground mt-4">Video próximamente</div>
          <form method="dialog" className="mt-4 text-right"><button className="btn btn-sm">Cerrar</button></form>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </section>
  )
}
