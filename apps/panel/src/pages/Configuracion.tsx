import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { api, ApiError, ROOT } from '@/lib/api'
import { optimizeImage } from '@/lib/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

type Profile = { username: string; avatarUrl: string | null }

export function Configuracion() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [username, setUsername] = useState('')
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    api<Profile>('/api/settings/profile')
      .then((p) => {
        setProfile(p)
        setUsername(p.username)
      })
      .catch(() => toast.error('No se pudo cargar el perfil'))
  }, [])

  async function saveUsername() {
    setBusy(true)
    try {
      const p = await api<Profile>('/api/settings/profile', {
        method: 'PUT',
        body: { username },
      })
      setProfile(p)
      window.dispatchEvent(new Event('profile-updated'))
      toast.success('Usuario actualizado')
    } catch {
      toast.error('No se pudo guardar el usuario')
    } finally {
      setBusy(false)
    }
  }

  async function savePassword() {
    if (next !== confirm) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    if (next.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setBusy(true)
    try {
      await api('/auth/password', { body: { current, new: next } })
      setCurrent('')
      setNext('')
      setConfirm('')
      toast.success('Contraseña actualizada')
    } catch (e) {
      toast.error(
        e instanceof ApiError && e.status === 401
          ? 'Contraseña actual incorrecta'
          : 'No se pudo cambiar la contraseña',
      )
    } finally {
      setBusy(false)
    }
  }

  async function onAvatar(files: FileList) {
    const file = files[0]
    if (!file) return
    setBusy(true)
    try {
      const prepared = await optimizeImage(file, 512, 0.9)
      const res = await fetch(`${ROOT}/api/settings/avatar`, {
        method: 'PUT',
        headers: { 'content-type': prepared.type || 'image/jpeg' },
        body: prepared,
        credentials: 'include',
      })
      if (!res.ok) throw new Error('upload')
      setProfile((await res.json()) as Profile)
      window.dispatchEvent(new Event('profile-updated'))
      toast.success('Foto actualizada')
    } catch {
      toast.error('No se pudo subir la foto')
    } finally {
      setBusy(false)
    }
  }

  const initials = (profile?.username ?? '?').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl leading-none">Configuración</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tu cuenta y perfil.</p>
      </div>

      <Tabs defaultValue="cuenta" className="max-w-2xl">
        <TabsList>
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="cuenta" className="flex flex-col gap-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuario</CardTitle>
              <CardDescription>Con este nombre entras al panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void saveUsername()
                }}
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoCapitalize="none"
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={busy || !username}>
                      Guardar usuario
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contraseña</CardTitle>
              <CardDescription>Cámbiala cuando quieras.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void savePassword()
                }}
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="current">Contraseña actual</FieldLabel>
                    <Input
                      id="current"
                      type="password"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="next">Nueva contraseña</FieldLabel>
                    <Input
                      id="next"
                      type="password"
                      value={next}
                      onChange={(e) => setNext(e.target.value)}
                      autoComplete="new-password"
                    />
                    <FieldDescription>Mínimo 6 caracteres.</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm">Repetir nueva</FieldLabel>
                    <Input
                      id="confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={busy || !current || !next || !confirm}>
                      Cambiar contraseña
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perfil" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Foto de perfil</CardTitle>
              <CardDescription>Se muestra en el panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  {profile?.avatarUrl && <AvatarImage src={profile.avatarUrl} alt="" />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={busy}
                    onClick={() => fileRef.current?.click()}
                  >
                    Cambiar foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG o PNG, cuadrada.</p>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) void onAvatar(e.target.files)
                  e.target.value = ''
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
