import { NAV, WHATSAPP_LINK } from '../content/site'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-primary/10">
      <nav className="navbar max-w-6xl mx-auto px-4">
        <div className="flex-1">
          <a href="#inicio" className="font-display text-primary text-lg tracking-widest">
            TERAPEUTA DEL CAOS
          </a>
        </div>
        <ul className="hidden md:flex menu menu-horizontal gap-1 text-xs tracking-wider text-base-content/70">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={'#' + n.id} className="hover:text-primary rounded-btn">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex-none">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"
             className="btn btn-primary btn-sm rounded-full font-semibold">
            HABLAR CON JR
          </a>
        </div>
      </nav>
    </header>
  )
}
