# Backend — API de la intranet

API REST en Express sobre MySQL, con el esquema en 6ª forma normal
(entidad + tablas de atributos temporales + vistas `v_*`).

Las dependencias y los scripts principales viven en el `package.json` de la
raíz del repositorio: hay un único `node_modules` para todo el proyecto.

```bash
npm run api:dev     # nodemon backend/src/server.js
npm run api:start   # node backend/src/server.js
npm test            # Jest + supertest (necesita MySQL corriendo)
```

## Estructura

```
backend/
├── src/
│   ├── config/            Entorno y conexión
│   │   ├── env.js         Lee backend/.env y expone la configuración
│   │   ├── database.js    Configuración por entorno (también la usa sequelize-cli)
│   │   └── db.js          Instancia única de Sequelize
│   ├── controllers/       HTTP -> servicio (sin SQL ni reglas de negocio)
│   ├── routes/            endpoint -> validador -> controlador
│   │   └── index.js       Monta todos los recursos bajo /api
│   ├── models/            Modelos Sequelize del esquema 6FN
│   │   ├── definitions.js Definiciones de las ~50 tablas
│   │   └── index.js       Loader + asociaciones
│   ├── services/          Reglas de negocio y acceso a datos
│   ├── middlewares/       Sesión, validación, 404 y errores
│   ├── utils/             AppError, catchAsync, respuestas HTTP
│   ├── types/             Typedefs JSDoc compartidos
│   ├── validators/        Reglas de validación por recurso
│   ├── app.js             Construye la app Express (sin escuchar puerto)
│   └── server.js          Punto de entrada: conecta a la BD y escucha
├── database/
│   ├── migrations/        Migraciones de sequelize-cli
│   ├── schema.sql         Esquema completo (tablas + vistas + seed de roles)
│   └── README.md          Documentación del modelo 6FN
├── tests/                 Tests de integración (Jest + supertest)
├── .env.example
└── package.json
```

## Cómo se atiende una petición

```
routes/cursos.routes.js       declara el endpoint
  -> validators/cursos.validator.js   valida el body (400 si falta algo)
  -> controllers/cursos.controller.js lee params/body y responde
  -> services/cursos.service.js       transacción + modelos + vistas
  -> models/                          Sequelize
```

Los errores no se manejan en el controlador: los servicios lanzan
`NotFoundError` / `BadRequestError` (`src/utils/AppError.js`), `catchAsync` los
deriva y `middlewares/error.middleware.js` los traduce a JSON.

## Convenciones 6FN

- Las **lecturas** siempre usan las vistas `v_*`, que ya resuelven el valor
  vigente de cada atributo.
- Las **escrituras** van por los modelos, dentro de una transacción.
- Un atributo mutable **nunca** se actualiza en su fila: se cierra el registro
  vigente (`valid_to = now`) y se abre uno nuevo
  (`services/temporal.service.js`), de modo que la historia queda completa.

## Recursos

| Recurso | Endpoints |
| --- | --- |
| `/api/usuarios` | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/alumnos` `/api/profesores` `/api/administradores` | GET, GET/:persona_id, POST, PUT, DELETE |
| `/api/establecimientos` | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/carreras` `/api/materias` `/api/periodos` | GET (`?establecimiento_id=`), GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/cursos` | GET (`?periodo_id=&materia_id=`), GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/aulas` | GET (`?establecimiento_id=`), GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/horarios` | GET (`?curso_id=`), GET/:id, POST, DELETE/:id |
| `/api/inscripciones` | GET (`?curso_id=&alumno_persona_id=`), GET/:id, POST, DELETE/:id |
| `/api/evaluaciones` | GET (`?curso_id=`), GET/:id, POST, PUT/:id, DELETE/:id |
| `/api/notas` | GET, GET/:inscripcion_id/:evaluacion_id, POST, PUT, DELETE |
| `/api/asistencia` | GET, POST, PUT/:inscripcion_id/:fecha, DELETE/:inscripcion_id/:fecha |
