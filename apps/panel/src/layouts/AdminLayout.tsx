import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { LogOut, Moon, Sun } from 'lucide-react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { useTheme, type Theme } from '@/lib/theme'

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'system', label: 'Sistema' },
]

export function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const { setTheme } = useTheme()

  async function logout() {
    await api('/auth/logout', { method: 'POST' }).catch(() => {})
    onLogout()
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur-md">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-5" />
          <span className="text-sm text-muted-foreground">Panel</span>
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Cambiar tema">
                  <Sun className="hidden dark:block" />
                  <Moon className="block dark:hidden" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tema</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {THEMES.map((t) => (
                    <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                      {t.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut data-icon="inline-start" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Suspense
            fallback={
              <div className="grid min-h-[40vh] place-items-center">
                <Spinner />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
