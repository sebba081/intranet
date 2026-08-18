# Base de datos · Intranet Educativa

Schema **6FN** (Sexta Forma Normal) sobre **MySQL 8+**.

## Estructura de la carpeta

```
src/database/
├── schema.sql              ← FUENTE DE VERDAD del schema (DDL completo)
├── config.js               ← instancia Sequelize alternativa
├── config/
│   ├── config.json         ← credenciales por entorno (dev / test / prod)
│   └── conection.js        ← conexión Sequelize con autenticación verbosa
├── migrations/
│   └── 20260101000000-create-6nf-schema.js  ← ejecuta schema.sql
└── models/
    ├── definitions.js      ← ~50 factories Sequelize (entidades + atributos + hechos)
    └── index.js            ← carga las factories y registra asociaciones
```

## Cómo levantar la BD

### Opción A · Ejecutar el SQL directamente (recomendado)

```bash
mysql -u root -p < src/database/schema.sql
```

Crea la BD `intranet`, todas las tablas, todas las vistas y los 5 roles base.

### Opción B · Usar las migraciones de Sequelize

```bash
npx sequelize-cli db:migrate
```

La migración inicial lee `schema.sql` y ejecuta cada statement.

## Decisiones de diseño 6FN

| Decisión | Razón |
|----------|-------|
| Cada entidad tiene tabla separada con sólo `id` | Permite que la entidad exista antes de tener atributos |
| Cada atributo no-clave en su propia tabla | Cumple 6FN estrictamente (PK + ≤ 1 atributo) |
| Atributos mutables → tablas con `valid_from`, `valid_to` | Historial completo gratis (passwords, nombres, capacidades, etc.) |
| `valid_to NULL` ⇒ registro vigente | Convención más simple que sentinel `9999-12-31` |
| Atributos inmutables sin temporal (DNI, código) | No tiene sentido versionar lo que no cambia |
| `calificacion`, `asistencia_presente`, `asistencia_justificada` como hechos atómicos | Cada hecho es una tabla, sin nulls |
| 15 vistas `v_*` en `schema.sql` | La API consulta vistas en vez de hacer 10 JOINs por query |
| `CHAR(36)` para UUIDs (no `BINARY(16)`) | Legibilidad > densidad para sistema educativo |
| `utf8mb4` + `utf8mb4_unicode_ci` | Soporte completo Unicode (acentos, ñ, emojis) |

## Tablas (resumen)

**Entidades base (13):** `establecimiento`, `persona`, `usuario`, `rol`, `carrera`, `materia`, `plan_estudio`, `periodo_academico`, `aula`, `curso`, `inscripcion`, `evaluacion`, `horario`.

**Atributos inmutables (18):** `establecimiento_rut`, `persona_dni`, `persona_fecha_nacimiento`, `rol_codigo`, `carrera_tipo`, `carrera_duracion`, `materia_codigo`, `periodo_nombre`, `periodo_tipo`, `periodo_fecha_inicio`, `periodo_fecha_fin`, `horario_dia`, `horario_hora_inicio`, `horario_hora_fin`, `inscripcion_fecha`, `inscripcion_carrera`, `evaluacion_tipo`, `evaluacion_fecha`.

**Atributos temporales (20):** `establecimiento_nombre`, `establecimiento_tipo`, `establecimiento_direccion`, `persona_nombre`, `persona_apellido`, `usuario_email`, `usuario_password`, `carrera_nombre`, `materia_nombre`, `materia_descripcion`, `materia_horas_semanales`, `plan_estudio_nombre`, `plan_estudio_vigente`, `periodo_activo`, `aula_nombre`, `aula_ubicacion`, `aula_capacidad`, `curso_cupo`, `curso_profesor`, `evaluacion_descripcion`, `evaluacion_ponderacion`.

**Relaciones (5):** `usuario_rol`, `plan_materia`, `plan_materia_nivel`, `plan_materia_obligatoria`, `plan_materia_creditos`.

**Hechos (3):** `calificacion`, `asistencia_presente`, `asistencia_justificada`.

**Total: ~59 tablas + 15 vistas.**

## Patrón de uso desde la API

### Consulta — usar siempre las vistas

```js
// ❌ NO consultar tablas atómicas directamente
const u = await Usuario.findByPk(id); // sólo trae { id, persona_id }

// ✅ Consultar la vista vigente
const [u] = await sequelize.query(
  'SELECT * FROM v_usuario WHERE id = ?',
  { replacements: [id], type: QueryTypes.SELECT }
);
// → { id, persona_id, email, password_hash }
```

### Inserción — transacción que cubre todas las tablas

```js
await sequelize.transaction(async (t) => {
  const personaId = uuidv4();
  const usuarioId = uuidv4();
  const now = new Date();

  await Persona.create({ id: personaId }, { transaction: t });
  await PersonaNombre.create({ persona_id: personaId, valid_from: now, nombre: 'Juan' }, { transaction: t });
  await PersonaApellido.create({ persona_id: personaId, valid_from: now, apellido: 'Pérez' }, { transaction: t });
  await PersonaDni.create({ persona_id: personaId, dni: '12345678' }, { transaction: t });

  await Usuario.create({ id: usuarioId, persona_id: personaId }, { transaction: t });
  await UsuarioEmail.create({ usuario_id: usuarioId, valid_from: now, email: 'juan@x.cl' }, { transaction: t });
  await UsuarioPassword.create({ usuario_id: usuarioId, valid_from: now, password_hash: hash }, { transaction: t });
});
```

### Actualización — cerrar el registro vigente y abrir uno nuevo

```js
// Cambiar email del usuario
await sequelize.transaction(async (t) => {
  const now = new Date();

  // Cerrar el vigente
  await UsuarioEmail.update(
    { valid_to: now },
    { where: { usuario_id, valid_to: null }, transaction: t }
  );

  // Abrir el nuevo
  await UsuarioEmail.create(
    { usuario_id, valid_from: now, email: 'nuevo@x.cl' },
    { transaction: t }
  );
});
```

## Migración pendiente de la API

Las rutas en `src/router/api/*` aún apuntan al schema 3FN previo y **no funcionan** con este schema. Reescribir cada ruta CRUD para:

1. Usar las vistas `v_*` en lecturas.
2. Envolver inserts/updates en transacciones que toquen entidad + tablas de atributos.
3. Reemplazar `password` plano → `usuario_password.password_hash` con `bcrypt`.
4. Reemplazar `rol` ENUM → asignación vía `usuario_rol` con FK a `rol` y `establecimiento`.

Los tests en `tests/*.test.js` también requieren reescritura — el `tests/setup.js` está deshabilitado temporalmente.
