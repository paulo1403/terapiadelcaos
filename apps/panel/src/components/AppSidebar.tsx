import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  CalendarDays,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  LibraryBig,
  PenSquare,
  Quote,
  Radio,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { api } from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

type Item = { to: string; label: string; icon: LucideIcon; end?: boolean }

const NAV: Item[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/biblioteca', label: 'Biblioteca', icon: LibraryBig },
  { to: '/cursos', label: 'Cursos', icon: GraduationCap },
  { to: '/accesos', label: 'Accesos', icon: KeyRound },
  { to: '/live', label: 'Live', icon: Radio },
  { to: '/contenido', label: 'Contenido web', icon: PenSquare },
  { to: '/testimonios', label: 'Testimonios', icon: Quote },
  { to: '/eventos', label: 'Eventos', icon: CalendarDays },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

export function AppSidebar() {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()
  const [profile, setProfile] = useState<{ username: string; avatarUrl: string | null } | null>(null)

  useEffect(() => {
    const load = () =>
      api<{ username: string; avatarUrl: string | null }>('/api/settings/profile')
        .then(setProfile)
        .catch(() => {})
    load()
    window.addEventListener('profile-updated', load)
    return () => window.removeEventListener('profile-updated', load)
  }, [])

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="size-9 rounded-xl">
            {profile?.avatarUrl && <AvatarImage src={profile.avatarUrl} alt="" />}
            <AvatarFallback className="rounded-xl bg-primary font-display text-lg text-primary-foreground">
              C
            </AvatarFallback>
          </Avatar>
          <div className="grid leading-tight">
            <span className="text-sm font-medium">Terapeuta del Caos</span>
            <span className="text-xs text-muted-foreground">{profile?.username ?? 'JR Rivera'}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarMenu>
            {NAV.map((item) => {
              const active = item.end ? pathname === item.to : pathname.startsWith(item.to)
              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                    <NavLink to={item.to} end={item.end} onClick={() => isMobile && setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-3 py-1 text-xs text-muted-foreground">WAKE UP® · v0.1</p>
      </SidebarFooter>
    </Sidebar>
  )
}
