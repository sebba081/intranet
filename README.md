# 🚪 Intranet Educativa

Aplicación de intranet para la gestión académica y administrativa de una institución educativa.

## 🎯 Objetivo

Centralizar operaciones de:

- Gestión de usuarios y roles.
- Gestión académica (carreras, cursos, materias, horarios, notas, inscripciones).
- Módulos de comunicación (anuncios, mensajes).
- Vistas de panel para distintos perfiles (admin, profesor, alumno).

## 🧱 Stack tecnológico

### Frontend

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**

### Backend API

- **Node.js + Express 5**
- **Sequelize ORM**
- **MySQL** (entorno normal)
- **SQLite** (entorno de pruebas automatizadas)

### Calidad

- **Jest + Supertest** para pruebas de API.
- **ESLint (Next.js config)** para linting.

## 📁 Estructura principal del proyecto

```text
src/
  app/                    # Rutas y páginas de Next.js (panel, login, home, etc.)
  core/                   # App shell y design system base (sidebar, topbar, tema)
  modules/                # Módulos por dominio (admin, académico, comunicaciones...)
  shared/                 # Componentes y utilidades reutilizables
  router/                 # Rutas de API Express (/api/*)
  database/               # Modelos Sequelize, migraciones y configuración DB
public/                   # Recursos estáticos CSS/JS
tests/                    # Pruebas de integración de endpoints
docs/                     # Requerimientos y diagramas funcionales/técnicos
```

## ✅ Estado de revisión técnica

Se verificó el proyecto de punta a punta ejecutando:

- Pruebas automáticas: **11 suites, 54 tests, todo en verde**.
- Lint: sin errores ni warnings.
- Build de producción de Next.js: exitoso.

> Nota: si al ejecutar pruebas aparece un error de `sqlite3` (por ejemplo, `invalid ELF header`), recompila el binario local con:
>
> ```bash
> npm install sqlite3 --build-from-source
> ```

## ⚙️ Requisitos

- **Node.js 20+** recomendado.
- **npm 10+** recomendado.
- Base de datos MySQL disponible para entorno de API real.

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/sebba081/intranet.git
cd intranet
npm install
```

### Desarrollo (frontend)

```bash
npm run dev
```

Aplicación: [http://localhost:3000](http://localhost:3000)

### API Express (desarrollo)

```bash
npm run api:dev
```

### Producción

```bash
npm run build
npm start
```

## 🧪 Testing y validaciones

### Ejecutar pruebas

```bash
npm test -- --runInBand
```

### Ejecutar lint

```bash
npm run lint
```

### Compilar para producción

```bash
npm run build
```

## 📚 Documentación

- Guía de documentación general: [`docs/README.md`](docs/README.md)
- Requerimientos funcionales: [`docs/requerimientos.md`](docs/requerimientos.md)
- Diagramas: [`docs/diagramas/README.md`](docs/diagramas/README.md)

## 🤝 Contribución

1. Crea una rama desde `main`.
2. Realiza cambios pequeños y verificables.
3. Ejecuta pruebas, lint y build antes de abrir PR.
4. Documenta cualquier cambio funcional en los README correspondientes.
