// Configuracion centralizada de Terapeuta del Caos.
// Editar aqui para cambiar textos, eventos, productos y enlaces sin tocar componentes.

export const WHATSAPP_NUMBER = '51962852987'
export const WHATSAPP_LINK = 'https://wa.me/' + WHATSAPP_NUMBER

// Hotmart: cambiar un solo lugar actualiza todos los checkouts.
export const HOTMART = {
  audiobooks: '', // HOTMART_AUDIOBOOKS_URL
  wakeup: '', // HOTMART_WAKEUP_URL
  mentoria: '', // HOTMART_MENTORIA_URL
}

export const BRAND = {
  name: 'TERAPEUTA DEL CAOS',
  program: 'WAKE UP®',
  founder: 'JR Rivera',
  tagline: 'NO VINISTE A CONTROLAR EL CAOS. VINISTE A DESPERTAR DENTRO DE EL.',
}

export const NAV = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'terapia', label: 'TERAPIA DEL CAOS' },
  { id: 'wakeup', label: 'WAKE UP' },
  { id: 'despertares', label: 'DESPERTARES' },
  { id: 'experiencias', label: 'EXPERIENCIAS' },
  { id: 'audiolibros', label: '21 AUDIOLIBROS' },
  { id: 'jr', label: 'SOBRE JR' },
  { id: 'contacto', label: 'CONTACTO' },
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
