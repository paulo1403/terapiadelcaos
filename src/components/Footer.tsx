import { BRAND, NAV } from '../content/site'
import { WA } from '../lib/wa'
import { useSite } from '../lib/site'

export function Footer() {
  const { content } = useSite()
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="footer-brand">{content['brand.name'] ?? BRAND.name}</p>
            <p className="footer-meta">
              {BRAND.program} · {BRAND.founder}
            </p>
            <p className="footer-tagline">{BRAND.tagline}</p>
          </div>

          <div className="footer-right">
            <nav className="footer-nav">
              {NAV.map((n) => (
                <a key={n.id} href={'#' + n.id} className="footer-link">
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href={WA('Hola JR, quiero hablar sobre un proceso.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              HABLAR CON JR · 962 852 987
            </a>
          </div>
        </div>

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Terapeuta del Caos. Todos los derechos reservados.</p>
          <p className="dot">WAKE UP®</p>
        </div>
      </div>
    </footer>
  )
}
