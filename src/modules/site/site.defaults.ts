export type SiteSection = { id: string; label: string; visible: boolean }

export type SiteConfig = {
  sections: SiteSection[]
  content: Record<string, string>
  labels: Record<string, string>
  defaults?: Record<string, string>
}

export const DEFAULT_SITE: SiteConfig = {
  sections: [
    { id: 'hero', label: 'Inicio', visible: true },
    { id: 'tresCaminos', label: 'Tres caminos', visible: true },
    { id: 'quiz', label: 'Quiz', visible: true },
    { id: 'terapia', label: 'Terapia del Caos', visible: true },
    { id: 'wakeup', label: 'WAKE UP', visible: true },
    { id: 'cursos', label: 'Cursos', visible: true },
    { id: 'audiolibros', label: 'Audiolibros', visible: true },
    { id: 'despertares', label: 'Despertares', visible: true },
    { id: 'medicina', label: 'Medicina ancestral', visible: true },
    { id: 'testimonios', label: 'Testimonios', visible: true },
    { id: 'jr', label: 'JR Rivera', visible: true },
  ],
  content: {
    'brand.name': 'TERAPEUTA DEL CAOS',
    'hero.eyebrow': 'JR Rivera · Terapeuta · Desde 2012',
    'hero.title1': 'Terapeuta',
    'hero.title2': 'del caos',
    'hero.lead1': 'No viniste a controlar el caos.',
    'hero.lead2': 'Viniste a despertar dentro de él.',
    'hero.subtitle':
      'Transformación emocional e integración. Para quienes están listos para un proceso diferente — con presencia y acompañamiento real.',
    'hero.cta1': 'CONOCER TERAPIA DEL CAOS',
    'hero.cta2': 'VER HISTORIA JR',
    'cursos.title': 'Cursos',
    'cursos.lead': 'Aprende a tu ritmo con videos y procesos guiados.',
    'testimonios.title': 'Historias reales',
    'testimonios.lead': 'Resultados y testimonios de procesos reales, con autorización.',
  },
  labels: {
    'brand.name': 'Nombre de marca',
    'hero.eyebrow': 'Hero · línea superior',
    'hero.title1': 'Hero · título línea 1',
    'hero.title2': 'Hero · título línea 2',
    'hero.lead1': 'Hero · frase 1',
    'hero.lead2': 'Hero · frase 2',
    'hero.subtitle': 'Hero · descripción',
    'hero.cta1': 'Hero · botón principal',
    'hero.cta2': 'Hero · botón secundario',
    'cursos.title': 'Cursos · título',
    'cursos.lead': 'Cursos · descripción',
    'testimonios.title': 'Testimonios · título',
    'testimonios.lead': 'Testimonios · descripción',
  },
}
