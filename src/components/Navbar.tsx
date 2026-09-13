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

  const themeButton = (className: string) => (
    <button type="button" aria-label="Cambiar tema" onClick={toggle} className={className}>
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </button>
  )

  return (
    <header className="fixed top-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-4xl -translate-x-1/2">
      <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-background/70 px-2 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <a
          href="#inicio"
          onClick={(e) => handleNav(e, 'inicio')}
          className="shrink-0 whitespace-nowrap px-4 font-display text-xs tracking-[0.16em] text-foreground sm:text-sm"
        >
          {content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              onClick={(e) => handleNav(e, n.id)}
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors ${
                active === n.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-1 pr-1 lg:flex">
          {themeButton('btn btn-ghost btn-icon text-foreground')}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            HABLAR CON JR
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1 pr-1 lg:hidden">
          {themeButton('btn btn-ghost btn-icon text-foreground')}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="btn btn-ghost btn-icon text-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <p className="font-display tracking-widest text-primary">
          {content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}
        </p>
        <span className="hairline my-4 block" />
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              onClick={(e) => handleNav(e, n.id)}
              className={`rounded-xl px-4 py-3 text-sm tracking-wide transition-colors ${
                active === n.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <span className="hairline my-4 block" />
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary w-full rounded-full"
        >
          HABLAR CON JR
        </a>
      </Drawer>
    </header>
  )
}
