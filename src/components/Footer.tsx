import { BRAND, NAV } from '../content/site'
import { WA } from '../lib/wa'
import { useSite } from '../lib/site'

export function Footer() {
  const { content } = useSite()
  return (
    <footer className="border-t border-border px-6 pb-12 pt-20 lg:px-10">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="display text-[clamp(2.5rem,7vw,4.5rem)] leading-none">
              {content['brand.name'] ?? BRAND.name}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {BRAND.program} · {BRAND.founder}
            </p>
            <p className="mt-5 max-w-sm font-display text-lg leading-snug text-muted-foreground">
              {BRAND.tagline}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={'#' + n.id}
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href={WA('Hola JR, quiero hablar sobre un proceso.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              HABLAR CON JR · 962 852 987
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Terapeuta del Caos. Todos los derechos reservados.</p>
          <p className="tracking-[0.2em]">WAKE UP®</p>
        </div>
      </div>
    </footer>
  )
}
