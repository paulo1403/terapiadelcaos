
const TESTIMONIOS = [
  { nombre: 'M. R.', texto: 'Atravesar el caos con acompanamiento cambio mi relacion conmigo misma. No fue magia, fue aprender a mirar.', ciudad: 'Lima' },
  { nombre: 'J. C.', texto: 'WAKE UP me dio herramientas concretas. Hoy respiro antes de reaccionar. Eso vale oro.', ciudad: 'Trujillo' },
  { nombre: 'A. L.', texto: 'La experiencia fue intensa pero segura. La integracion despues fue lo que la hizo real.', ciudad: 'Piura' },
]

const MANIFIESTO = ['NO HUYAS DE LO QUE SIENTES.', 'ESCUCHA.', 'RESPIRA.', 'OBSERVA.', 'COMPRENDE.', 'INTEGRA.', 'DESPIERTA.']

export function JR() {
  return (
    <section id="jr" className="py-24 px-5 bg-base-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-1/3 flex flex-col items-center text-center">
            <div className="avatar placeholder">
              <div className="bg-primary/20 text-primary w-40 h-40 rounded-full font-display text-5xl">
                JR
              </div>
            </div>
            <h3 className="font-display text-2xl text-primary mt-5">JR RIVERA</h3>
            <p className="text-base-content/60 text-sm">Psicologo · Psicoterapeuta · Facilitador de procesos de transformacion</p>
            <button className="btn btn-outline btn-primary rounded-full mt-5" onClick={() => (document.getElementById('jr-video') as HTMLDialogElement)?.showModal()}>
              ▶ VER VIDEO
            </button>
          </div>
          <div className="md:w-2/3">
            <p className="text-accent text-sm tracking-[0.3em] mb-3">YO TAMBIEN CONOCI EL CAOS</p>
            <div className="space-y-4 text-base-content/70">
              <p>
                Mi camino no empezo en un consultorio. Empezo en el dolor, en la busqueda, en el
                aprendizaje, en la transformacion y, finalmente, en la creacion de Terapia del Caos.
              </p>
              <p>
                No creé Terapia del Caos porque tuviera todas las respuestas. La creé porque aprendi
                a hacer mejores preguntas.
              </p>
              <p>
                Hoy acompano procesos donde la persona no es un paciente que hay que arreglar, sino
                un ser humano que esta atravesando su propio caos conscientemente.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-accent text-sm tracking-[0.3em] mb-8">MANIFIESTO</p>
          <div className="space-y-3 font-display text-2xl sm:text-4xl text-gold-gradient">
            {MANIFIESTO.map((m, i) => (
              <p key={i} className="opacity-0 animate-[fadeIn_0.6s_ease_forwards]" style={{ animationDelay: i * 0.4 + 's' }}>{m}</p>
            ))}
          </div>
          <p className="mt-10 font-display text-3xl text-primary">TERAPIA DEL CAOS</p>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl text-primary text-center mb-8">TESTIMONIOS</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <div key={t.nombre} className="card bg-base-100 border border-primary/10">
                <div className="card-body">
                  <p className="text-base-content/70 italic">"{t.texto}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="avatar placeholder">
                      <div className="bg-primary/20 text-primary w-10 h-10 rounded-full text-sm">{t.nombre[0]}</div>
                    </div>
                    <div className="text-sm">
                      <p className="text-primary font-semibold">{t.nombre}</p>
                      <p className="text-base-content/50">{t.ciudad}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <dialog id="jr-video" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-display text-lg text-primary mb-4">CONOCEME</h3>
          <div className="aspect-video bg-base-300 rounded-box flex items-center justify-center text-base-content/50">
            Video de JR (proximamente)
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cerrar</button></form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </section>
  )
}
