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
            <a key={c.t} href={c.href} className="glass rounded-2xl p-7 text-left hover:border-gold/40 transition-colors">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="font-display text-lg text-gold mt-3">{c.t}</h3>
              <p className="text-muted text-sm mt-2">{c.d}</p>
              <span className="inline-block mt-4 text-sm text-gold border-b border-gold/40">{c.cta}</span>
            </a>
          ))}
        </div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
           className="inline-block mt-10 px-7 py-3 rounded-full bg-gold text-ink font-semibold hover:bg-gold-bright transition-colors">
          HABLAR CON JR
        </a>
      </div>
    </section>
  )
}
