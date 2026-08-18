# Frontend — Intranet (Next.js 15 + App Router)

Interfaz de la intranet. Consume la API de `backend/` a través de
`src/services/api.ts`.

Las dependencias viven en el `package.json` de la raíz; los scripts apuntan a
esta carpeta:

```bash
npm run dev     # next dev frontend
npm run build   # next build frontend
npm run start   # next start frontend
npm run lint    # next lint frontend
```

## Estructura

```
frontend/
├── src/
│   ├── app/            Rutas del App Router (sólo composición de páginas)
│   │   ├── (public)/   Landing y redirecciones
│   │   ├── (panel)/    Área autenticada, agrupada por dominio
│   │   └── login/
│   ├── components/
│   │   ├── ui/         Primitivas reutilizables (button, card, input, table…)
│   │   └── layout/     Estructura de la app (app-shell, sidebar, topbar, tema)
│   ├── features/       Un módulo por dominio funcional
│   │   ├── auth/       Contexto de sesión, RoleGate, RouteGuard
│   │   ├── academico/  Cursos, evaluaciones, asistencia
│   │   ├── admin/      Usuarios y roles
│   │   ├── comunicaciones/
│   │   ├── dashboard/
│   │   └── documentos/
│   ├── config/         Configuración estática (navegación por rol)
│   ├── services/       Cliente HTTP de la API
│   ├── lib/            Utilidades (cn, helpers)
│   ├── types/          Tipos compartidos (Role, User, MenuItem)
│   └── styles/         globals.css y tokens de tema
├── public/             Estáticos servidos en la raíz del sitio
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json       Alias `@/*` -> `frontend/src/*`
```

## Convenciones

- **`app/` no contiene lógica**: cada página compone componentes de
  `components/` y datos de `features/`.
- **Cada feature expone su API pública en `index.ts`**; el resto del código
  importa `@/features/academico`, nunca un archivo interno.
- Los datos de ejemplo viven en `features/<dominio>/data/` junto a sus tipos.
  Al conectar la API real, esos módulos se reemplazan por llamadas de
  `services/api.ts` sin tocar las páginas.
- Alias único de imports: `@/…` apunta a `frontend/src/…`.

## Equivalencia con el backend

| Frontend | Backend |
| --- | --- |
| `app/` | `routes/` |
| `features/` | `controllers/` + `services/` |
| `services/api.ts` | los endpoints `/api/*` |
| `config/` | `config/` |
| `lib/` | `utils/` |
| `types/` | `types/` |
