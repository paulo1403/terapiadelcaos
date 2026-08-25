import { BRAND, WHATSAPP_LINK, NAV } from '../content/site'

export function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-10 gap-6">
      <aside>
        <p className="font-display text-primary text-xl tracking-widest">TERAPEUTA DEL CAOS</p>
        <p className="text-base-content/60 text-sm">{BRAND.program} · {BRAND.founder}</p>
      </aside>
      <nav>
        <ul className="menu menu-horizontal gap-2 text-sm flex-wrap justify-center">
          {NAV.map((n) => (
            <li key={n.id}><a href={'#' + n.id} className="hover:text-primary">{n.label}</a></li>
          ))}
        </ul>
      </nav>
      <nav>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm rounded-full">HABLAR CON JR · 962 852 987</a>
      </nav>
      <aside>
        <p className="text-base-content/40 text-xs">© {new Date().getFullYear()} Terapeuta del Caos. Todos los derechos reservados.</p>
      </aside>
    </footer>
  )
}
