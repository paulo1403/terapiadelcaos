import { useState, useEffect } from 'react'
import { NAV, WHATSAPP_LINK } from '../content/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Menu } from 'lucide-react'
import { scrollTo } from '@/lib/lenis'
import { useSite } from '../lib/site'

export function Navbar() {
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)
  const { content } = useSite()

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

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1rem)] max-w-4xl">
      <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-full bg-[#101012]/70 backdrop-blur-xl border border-[#efe9df]/12 shadow-2xl shadow-black/40">
        <a
          href="#inicio"
          onClick={(e) => handleNav(e, 'inicio')}
          className="font-display text-[#efe9df] tracking-[0.16em] text-xs sm:text-sm whitespace-nowrap px-4 shrink-0"
        >
          {content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}
        </a>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              onClick={(e) => handleNav(e, n.id)}
              className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-colors ${
                active === n.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-[#efe9df]/60 hover:text-[#efe9df] hover:bg-[#efe9df]/10'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 shrink-0 pr-1">
          <Button asChild size="sm" className="rounded-full font-medium shadow-md">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              HABLAR CON JR
            </a>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-1 shrink-0 pr-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 text-[#efe9df] hover:bg-[#efe9df]/10 hover:text-[#efe9df]"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 max-w-[85vw] flex flex-col">
              <SheetHeader className="text-left">
                <SheetTitle className="font-display tracking-widest text-primary">
                  {content['brand.name'] ?? 'TERAPEUTA DEL CAOS'}
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-1 flex-1">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={'#' + n.id}
                    onClick={(e) => handleNav(e, n.id)}
                    className={`px-4 py-3 rounded-xl text-sm tracking-wide transition-colors ${
                      active === n.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
              <Separator className="my-4" />
              <Button asChild className="w-full rounded-full">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  HABLAR CON JR
                </a>
              </Button>
              <SheetClose className="sr-only" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
