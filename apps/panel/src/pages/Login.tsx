import { useState } from 'react'
import type { FormEvent } from 'react'
import { api, ApiError } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api('/auth/login', { body: { username, password } })
      onSuccess()
    } catch (e) {
      setError(
        e instanceof ApiError && e.status === 401
          ? 'Usuario o contraseña incorrectos'
          : 'No se pudo entrar',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-[100dvh] place-items-center px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardDescription>Panel</CardDescription>
          <CardTitle className="font-display text-3xl">Terapeuta del caos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Usuario</FieldLabel>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoFocus
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Field>
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button type="submit" disabled={loading || !username || !password}>
                  {loading && <Spinner data-icon="inline-start" />}
                  {loading ? 'Entrando…' : 'Entrar'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
