import { BRAND, NAV } from '../content/site'
import { WA } from '../lib/wa'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-lg tracking-[0.16em] text-primary">TERAPEUTA DEL CAOS</p>
            <p className="mt-1 text-xs tracking-wide text-muted-foreground">
              {BRAND.program} · {BRAND.founder} · 12 años · +500 procesos
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
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
            className="inline-flex h-10 w-fit items-center justify-center rounded-full border border-border px-5 text-xs font-medium tracking-wide transition-colors hover:bg-muted"
          >
            HABLAR CON JR · 962 852 987
          </a>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Terapeuta del Caos. Todos los derechos reservados.</p>
          <p className="tracking-[0.2em]">WAKE UP®</p>
        </div>
      </div>
    </footer>
  )
}
