import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV, WHATSAPP_LINK } from '../content/site'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    const prev = scrollY.getPrevious() ?? 0
    if (latest > prev && latest > 120) setHidden(true)
    else setHidden(false)
  })

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#inicio" className="font-display text-primary tracking-[0.12em] lg:tracking-[0.18em] shrink-0 text-[13px] lg:text-lg whitespace-nowrap">
            TERAPEUTA DEL CAOS
          </a>
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <ul className="flex gap-1 text-xs tracking-wider text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.id}><a href={'#' + n.id} className="px-2 py-1 whitespace-nowrap hover:text-primary transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:flex shrink-0">
            <Button asChild size="sm" className="rounded-full font-semibold">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">HABLAR CON JR</a>
            </Button>
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-md hover:bg-accent shrink-0" aria-label="menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background z-50 shadow-2xl p-6 flex flex-col border-l">
              <button onClick={() => setOpen(false)} className="self-end h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent">✕</button>
              <motion.ul initial="hidden" animate="visible" exit="hidden" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} className="flex flex-col gap-1 mt-6">
                {NAV.map((n) => (
                  <motion.li key={n.id} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                    <a href={'#' + n.id} onClick={() => setOpen(false)} className="block py-2 hover:text-primary">{n.label}</a>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
                <Button asChild className="w-full rounded-full">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">HABLAR CON JR</a>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
