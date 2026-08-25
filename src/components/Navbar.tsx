import { NAV, WHATSAPP_LINK } from '../content/site'

export function Navbar() {
  return (
    <div className="drawer">
      <input id="tdc-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-primary/10">
          <nav className="navbar max-w-6xl mx-auto px-4">
            <div className="flex-1">
              <a href="#inicio" className="font-display text-primary text-lg tracking-widest">TERAPEUTA DEL CAOS</a>
            </div>
            <ul className="hidden lg:flex menu menu-horizontal gap-1 text-xs tracking-wider text-base-content/70">
              {NAV.map((n) => (
                <li key={n.id}><a href={'#' + n.id} className="hover:text-primary rounded-btn">{n.label}</a></li>
              ))}
            </ul>
            <div className="flex-none hidden lg:block">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm rounded-full font-semibold">HABLAR CON JR</a>
            </div>
            <div className="flex-none lg:hidden">
              <label htmlFor="tdc-drawer" className="btn btn-ghost btn-square">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </label>
            </div>
          </nav>
        </header>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="tdc-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4 gap-1">
          {NAV.map((n) => (
            <li key={n.id}><a href={'#' + n.id} className="hover:text-primary">{n.label}</a></li>
          ))}
          <li className="mt-4"><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary rounded-full">HABLAR CON JR</a></li>
        </ul>
      </div>
    </div>
  )
}
