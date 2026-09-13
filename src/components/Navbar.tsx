import { useState, useEffect } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { NAV, WHATSAPP_LINK } from '../content/site'
import { Drawer } from '@/components/ui/Drawer'
import { scrollTo } from '@/lib/scroll'
import { useSite } from '../lib/site'
import { useTheme } from '../lib/theme'

export function Navbar() {
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)
  const { content } = useSite()
  const { toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
      let current = 'inicio'
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= 120) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    scrollTo('#' + id)
    setOpen(false)
  }

  const themeButton = (
    <button type="button" aria-label="Cambiar tema" onClick={toggle} className="btn btn-ghost btn-icon">
      <Sun className="dark-only" />
      <Moon className="light-only" />
    </button>
  )

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#inicio" onClick={(e) => handleNav(e, 'inicio')} className="navbar-brand">
          {content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}
        </a>

        <nav className="navbar-nav">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              onClick={(e) => handleNav(e, n.id)}
              aria-current={active === n.id}
              className="navbar-link"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          {themeButton}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            HABLAR CON JR
          </a>
        </div>

        <div className="navbar-mobile">
          {themeButton}
          <button type="button" aria-label="Abrir menú" onClick={() => setOpen(true)} className="btn btn-ghost btn-icon">
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <p className="drawer-brand">{content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}</p>
        <span className="hairline sep" />
        <nav className="drawer-nav">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              onClick={(e) => handleNav(e, n.id)}
              aria-current={active === n.id}
              className="drawer-link"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <span className="hairline sep" />
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary full">
          HABLAR CON JR
        </a>
      </Drawer>
    </header>
  )
}
