# Terapia del Caos

Monorepo. Tres apps:

| Ruta | Qué es | Puerto |
|---|---|---|
| `apps/web` | Sitio público (Vite, migrando a Next.js) | 3005 |
| `apps/panel` | Panel de administración (Vite, migrando a Next.js) | 3004 |
| `apps/api` | API Bun + PostgreSQL | 3102 |

## Desarrollo

```bash
bun install
bun run dev:api      # 3102
bun run dev:panel    # 3004
bun run dev:web      # 3005
```
