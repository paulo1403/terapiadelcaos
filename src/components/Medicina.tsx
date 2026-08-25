export function Medicina() {
  return (
    <section className="py-24 px-5 bg-aurora">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent text-sm tracking-[0.3em] mb-4">MEDICINA ANCESTRAL</p>
        <h2 className="font-display text-3xl sm:text-5xl text-gold-gradient mb-6">AYAHUASCA</h2>
        <p className="text-base-content/70 max-w-2xl text-lg">
          La ayahuasca es una preparacion psicoactiva de tradicion amazonica que puede producir
          experiencias intensas de introspeccion, percepcion, emocion, memoria y significado.
          Dentro del universo de Terapia del Caos se aborda como una experiencia que requiere
          preparacion, acompanamiento, responsabilidad e integracion. No se presenta como una
          solucion magica ni como sustituto de atencion medica o psicologica.
        </p>

        <ul className="timeline timeline-vertical mt-16">
          <li>
            <div className="timeline-start font-display text-primary">PREPARACION</div>
            <div className="timeline-middle text-primary">●</div>
            <div className="timeline-end timeline-box bg-base-100 border border-primary/10">
              Conocer contexto, intencion y criterios de seguridad.
            </div>
          </li>
          <li>
            <div className="timeline-start font-display text-primary">EXPERIENCIA</div>
            <div className="timeline-middle text-primary">●</div>
            <div className="timeline-end timeline-box bg-base-100 border border-primary/10">
              Acompanamiento durante el proceso.
            </div>
          </li>
          <li>
            <div className="timeline-start font-display text-primary">INTEGRACION</div>
            <div className="timeline-middle text-primary">●</div>
            <div className="timeline-end timeline-box bg-base-100 border border-primary/10">
              Reflexionar sobre lo vivido y convertirlo en aprendizajes aplicables a la vida cotidiana.
            </div>
          </li>
        </ul>
        <p className="text-center font-display text-xl text-gold-gradient mt-10">LA EXPERIENCIA TERMINA. LA INTEGRACION COMIENZA.</p>

        <div className="mt-12">
          <div role="alert" className="alert alert-warning alert-soft border border-warning/30">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.7 3h16.96a2 2 0 0 0 1.7-3L13.7 3.86a2 2 0 0 0-3.4 0z"/></svg>
            <div>
              <h3 className="font-bold text-warning-content">EL DESPERTAR TAMBIEN NECESITA RESPONSABILIDAD</h3>
              <div className="text-sm text-warning-content/80">
                Antes de una experiencia con sustancias psicoactivas considera antecedentes medicos,
                psicologicos, medicamentos, consumo de otras sustancias y factores de riesgo individuales.
                No suspendas medicamentos por cuenta propia. Las experiencias con ayahuasca no sustituyen
                tratamientos medicos o psicologicos. La participacion esta sujeta a criterios de seguridad
                y evaluacion previa.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
