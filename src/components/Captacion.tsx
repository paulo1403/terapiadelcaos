import { WHATSAPP_LINK } from '../content/site'

const caminos = [
  { icon: '🌑', t: 'QUIERO CONOCER', d: 'Ver video y conocer Terapia del Caos.', href: '#terapia', cta: 'CONOCER' },
  { icon: '🔥', t: 'QUIERO TRANSFORMARME', d: 'Conocer WAKE UP.', href: '#wakeup', cta: 'CONOCER WAKE UP' },
  { icon: '🎧', t: 'QUIERO COMENZAR DESDE CASA', d: '21 Audiolibros.', href: '#audiolibros', cta: 'AUDIOLIBROS' },
  { icon: '🌿', t: 'QUIERO VIVIR UNA EXPERIENCIA', d: 'Despertares / presencial.', href: '#despertares', cta: 'DESPERTAR' },
]

export function Captacion() {
  return (
    <section className="py-24 px-5 bg-aurora">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-gold-gradient mb-12">POR DONDE QUIERES COMENZAR?</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {caminos.map((c) => (
            <a key={c.t} href={c.href} className="card bg-base-100 border border-primary/10 hover:border-primary/40 transition-colors text-left">
              <div className="card-body">
                <div className="text-3xl">{c.icon}</div>
                <h3 className="font-display text-lg text-primary mt-3">{c.t}</h3>
                <p className="text-base-content/60 text-sm mt-2">{c.d}</p>
                <span className="text-sm text-primary mt-4 border-b border-primary/40 inline-block w-fit">{c.cta}</span>
              </div>
            </a>
          ))}
        </div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary rounded-full px-8 mt-10">HABLAR CON JR</a>
      </div>
    </section>
  )
}
