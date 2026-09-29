// Base del panel (Vite base). En prod es "/admin"; en dev "/".
export const ROOT = import.meta.env.BASE_URL.replace(/\/$/, '')

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

type ApiInit = { method?: string; body?: unknown }

export async function api<T>(path: string, init: ApiInit = {}): Promise<T> {
  const res = await fetch(`${ROOT}${path}`, {
    method: init.method ?? (init.body === undefined ? 'GET' : 'POST'),
    headers: init.body === undefined ? undefined : { 'content-type': 'application/json' },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    credentials: 'include',
  })
  if (!res.ok) throw new ApiError(res.status, await res.text().catch(() => ''))
  return (await res.json()) as T
}
