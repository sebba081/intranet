# Intranet Educativa

Monorepo con dos aplicaciones independientes que comparten un único
`node_modules` y un `package.json` de dependencias en la raíz:

```
intranet/
├── backend/     API REST — Express 5 + Sequelize sobre MySQL (schema 6FN)
├── frontend/    Interfaz — Next.js 15 (App Router) + Tailwind
├── docs/        Requerimientos y diagramas
├── package.json Dependencias y scripts de todo el proyecto
└── .sequelizerc Rutas de sequelize-cli hacia backend/
```

Cada carpeta tiene su propio README con la estructura interna y sus
convenciones: [backend/README.md](backend/README.md) ·
[frontend/README.md](frontend/README.md).

## Puesta en marcha

```bash
npm install

# Base de datos (una sola vez)
mysql -u root -p < backend/database/schema.sql

# Credenciales del backend
cp backend/.env.example backend/.env    # y editar DB_USER / DB_PASSWORD
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Next.js en `http://localhost:3000` |
| `npm run api:dev` | API con nodemon en `http://localhost:3001` |
| `npm run build` | Build de producción del frontend |
| `npm start` | Sirve el build del frontend |
| `npm run lint` | ESLint sobre `frontend/src` |
| `npm test` | Jest + supertest contra la API (requiere MySQL) |
| `npm run migrate` | `sequelize-cli db:migrate` |

Frontend y backend corren en procesos separados: hay que levantar los dos
(`npm run dev` y `npm run api:dev` en dos terminales). El frontend llama a la
API a través de `NEXT_PUBLIC_API_URL` (ver `frontend/.env.local.example`).

## Estructura en capas

Ambas aplicaciones usan la misma idea: las rutas no contienen lógica, la
lógica vive en una capa intermedia y los tipos/utilidades son transversales.

| Backend | Frontend | Responsabilidad |
| --- | --- | --- |
| `routes/` | `app/` | Declara los endpoints / las páginas |
| `controllers/` | *(páginas)* | Traduce entrada y salida |
| `services/` | `features/` + `services/api.ts` | Reglas de negocio y datos |
| `models/` | — | Acceso a la base de datos |
| `validators/` `middlewares/` | `features/auth/` | Validación y control de acceso |
| `config/` `utils/` `types/` | `config/` `lib/` `types/` | Transversales |

## Base de datos

MySQL con el esquema en 6ª forma normal: cada atributo mutable vive en su
propia tabla temporal (`valid_from` / `valid_to`) y las lecturas se hacen
sobre las vistas `v_*`. El detalle está en
[backend/database/README.md](backend/database/README.md) y el esquema completo
en [backend/database/schema.sql](backend/database/schema.sql).
