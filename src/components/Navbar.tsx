import { NAV, WHATSAPP_LINK } from '../content/site'

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/80 backdrop-blur-md border-b border-gold/10">
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-display text-gold text-lg tracking-widest">
          TERAPEUTA DEL CAOS
        </a>
        <ul className="hidden md:flex items-center gap-5 text-xs tracking-wider text-muted">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={'#' + n.id} className="hover:text-gold transition-colors">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold px-4 py-2 rounded-full bg-gold text-ink hover:bg-gold-bright transition-colors"
        >
          HABLAR CON JR
        </a>
      </nav>
    </header>
  )
}
