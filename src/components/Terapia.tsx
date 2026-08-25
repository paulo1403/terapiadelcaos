export function Terapia() {
  const pasos = [
    { n: '01', t: 'SENTIR', d: 'Volver al cuerpo y reconocer lo que esta ocurriendo.' },
    { n: '02', t: 'COMPRENDER', d: 'Observar patrones, pensamientos, emociones y mecanismos aprendidos.' },
    { n: '03', t: 'LIBERAR', d: 'Trabajar aquello que ya no queremos seguir cargando.' },
    { n: '04', t: 'INTEGRAR', d: 'Convertir lo comprendido en conciencia aplicable a la vida cotidiana.' },
    { n: '05', t: 'DESPERTAR', d: 'Construir una relacion mas consciente con nosotros mismos.' },
  ]
  return (
    <section id="terapia" className="py-24 px-5 max-w-5xl mx-auto">
      <p className="text-amber/80 text-sm tracking-[0.3em] mb-4">EL CAOS NO ES TU ENEMIGO</p>
      <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-8">ES INFORMACION.</h2>
      <p className="text-muted max-w-2xl text-lg">
        Hay momentos en los que nuestra vida deja de funcionar como antes. Relaciones, perdidas,
        crisis, cambios, emociones, preguntas y experiencias pueden hacernos sentir que todo se
        desordena. Terapia del Caos propone mirar ese proceso desde otro lugar. No siempre
        necesitamos escapar del caos. A veces necesitamos aprender a atravesarlo conscientemente.
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pasos.map((p) => (
          <div key={p.n} className="glass rounded-2xl p-6 hover:border-gold/40 transition-colors">
            <div className="text-gold/60 font-display text-2xl">{p.n}</div>
            <h3 className="font-display text-lg text-gold mt-2">{p.t}</h3>
            <p className="text-muted text-sm mt-3">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
