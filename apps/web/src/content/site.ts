// Configuracion centralizada de Terapeuta del Caos.

export const WHATSAPP_NUMBER = '51962852987'
export const WHATSAPP_LINK = 'https://wa.me/' + WHATSAPP_NUMBER

export const HOTMART = {
  audiobooks: '',
  wakeup: '',
  mentoria: '',
}

export const BRAND = {
  name: 'TERAPEUTA DEL CAOS',
  program: 'WAKE UP®',
  founder: 'JR Rivera',
  tagline: 'NO VINISTE A CONTROLAR EL CAOS. VINISTE A DESPERTAR DENTRO DE EL.',
}

// ponytail: NAV minimal - 5 items max, resto accesible via scroll/footer. Ampliar solo si seccion necesita nav directo.
export const NAV = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'terapia', label: 'TERAPIA' },
  { id: 'wakeup', label: 'WAKE UP' },
  { id: 'despertares', label: 'DESPERTARES' },
  { id: 'jr', label: 'JR' },
]

export type Evento = {
  ciudad: string
  nombre: string
  fechaInicio: string
  fechaFin?: string
  descripcion: string
  imagen?: string
  estado: 'proximo' | 'agotado' | 'pasado'
  cupos?: number
}

export const EVENTOS = [
  {
    ciudad: 'Piura',
    nombre: 'Sanacion con Terapia del Caos',
    fechaInicio: '2026-09-04',
    fechaFin: '2026-09-06',
    descripcion: 'Tres jornadas de preparacion, experiencia e integracion en el universo Terapeuta del Caos.',
    estado: 'proximo',
    cupos: 20,
  },
  {
    ciudad: 'Trujillo',
    nombre: 'Despertar en la costa',
    fechaInicio: '',
    descripcion: 'Fecha configurable. Experiencia presencial de conciencia e integracion.',
    estado: 'proximo',
  },
  {
    ciudad: 'Lima',
    nombre: 'Despertar capital',
    fechaInicio: '',
    descripcion: 'Fecha configurable. Experiencia presencial de conciencia e integracion.',
    estado: 'proximo',
  },
]

export function whatsappMessage(text: string) {
  return WHATSAPP_LINK + '?text=' + encodeURIComponent(text)
}
