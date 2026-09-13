import { WHATSAPP_LINK } from '../content/site'

/** Link de WhatsApp con mensaje opcional. */
export function WA(text?: string): string {
  return text ? `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}` : WHATSAPP_LINK
}
