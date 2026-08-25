import { HOTMART } from '../content/site'

const TITULOS = [
  'El arte de sentir', 'Habitacion del silencio', 'Carta a mi dolor', 'Respira y suelta',
  'El cuerpo recuerda', 'Voces internas', 'Cicatrices luminosas', 'El permiso de soltar',
  'Donde nace la calma', 'Dialogo con el miedo', 'El peso de los "deberia"', 'Sanar sin prisa',
  'Raices y alas', 'La noche que ensena', 'Cuidar al nino interior', 'Fronteras sagradas',
  'Abrazar la incertidumbre', 'El lenguaje de las lagrimas', 'Vuelvo a mi', 'Despertar cotidiano',
  'El caos fecundo',
]

export function Audiolibros() {
  return (
    <section id="audiolibros" className="py-24 px-5 bg-base-200">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent text-sm tracking-[0.3em] mb-4">21 AUDIO LIBROS DE SANACION</p>
        <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-4">TU PROCESO TAMBIEN PUEDE COMENZAR DESDE CASA.</h2>
        <p className="text-base-content/60 max-w-2xl text-lg mb-12">
          Una biblioteca digital de contenidos para reflexion, autoconocimiento y practica personal.
        </p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {TITULOS.map((t, i) => (
            <article key={t} className="card bg-base-100 border border-primary/10 aspect-square hover:border-primary/40 hover:-translate-y-1 transition-all">
              <div className="card-body justify-between">
                <span className="text-primary/50 font-display text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-base text-primary leading-snug">{t}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href={HOTMART.audiobooks || '#'} target="_blank" rel="noreferrer" className="btn btn-primary rounded-full px-8">QUIERO LOS 21 AUDIOLIBROS</a>
        </div>
      </div>
    </section>
  )
}
