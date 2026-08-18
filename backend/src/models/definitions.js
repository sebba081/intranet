'use strict';

/**
 * Definiciones Sequelize del schema 6FN.
 *
 * Cada función recibe (sequelize, DataTypes) y retorna el modelo definido.
 * Index.js itera por este objeto para registrar los modelos y luego conecta
 * las asociaciones declaradas en `associations(models)`.
 *
 * Convenciones:
 *   - PK CHAR(36) (UUID v4)
 *   - Tablas temporales: PK compuesta (entidad_id, valid_from)
 *   - valid_to NULL  ⇒  registro vigente
 *   - timestamps: false (las tablas 6FN gestionan tiempo explícitamente)
 */

const UUID = (DataTypes) => ({
  type: DataTypes.CHAR(36),
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false
});

const FK = (DataTypes) => ({
  type: DataTypes.CHAR(36),
  allowNull: false
});

const tempPK = (DataTypes, entityCol) => ({
  [entityCol]: { type: DataTypes.CHAR(36), allowNull: false, primaryKey: true },
  valid_from: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  valid_to:   { type: DataTypes.DATE, allowNull: true }
});

const baseOpts = (tableName) => ({
  tableName,
  timestamps: false,
  freezeTableName: true
});

// =====================================================================
//  ENTIDADES BASE
// =====================================================================

const entidades = {
  Establecimiento: (s, D) =>
    s.define('Establecimiento', { id: UUID(D) }, baseOpts('establecimiento')),

  Persona: (s, D) =>
    s.define('Persona', { id: UUID(D) }, baseOpts('persona')),

  Usuario: (s, D) =>
    s.define('Usuario', {
      id: UUID(D),
      persona_id: { ...FK(D), unique: true }
    }, baseOpts('usuario')),

  Rol: (s, D) =>
    s.define('Rol', { id: UUID(D) }, baseOpts('rol')),

  Carrera: (s, D) =>
    s.define('Carrera', {
      id: UUID(D),
      establecimiento_id: FK(D)
    }, baseOpts('carrera')),

  Materia: (s, D) =>
    s.define('Materia', {
      id: UUID(D),
      establecimiento_id: FK(D)
    }, baseOpts('materia')),

  PlanEstudio: (s, D) =>
    s.define('PlanEstudio', {
      id: UUID(D),
      carrera_id: FK(D)
    }, baseOpts('plan_estudio')),

  PeriodoAcademico: (s, D) =>
    s.define('PeriodoAcademico', {
      id: UUID(D),
      establecimiento_id: FK(D)
    }, baseOpts('periodo_academico')),

  Aula: (s, D) =>
    s.define('Aula', {
      id: UUID(D),
      establecimiento_id: FK(D)
    }, baseOpts('aula')),

  Curso: (s, D) =>
    s.define('Curso', {
      id: UUID(D),
      materia_id: FK(D),
      periodo_id: FK(D)
    }, baseOpts('curso')),

  Inscripcion: (s, D) =>
    s.define('Inscripcion', {
      id: UUID(D),
      alumno_persona_id: FK(D),
      curso_id: FK(D)
    }, baseOpts('inscripcion')),

  Evaluacion: (s, D) =>
    s.define('Evaluacion', {
      id: UUID(D),
      curso_id: FK(D)
    }, baseOpts('evaluacion')),

  Horario: (s, D) =>
    s.define('Horario', {
      id: UUID(D),
      curso_id: FK(D),
      aula_id: FK(D)
    }, baseOpts('horario'))
};

// =====================================================================
//  ATRIBUTOS INMUTABLES (PK = entidad_id)
// =====================================================================

const inmutables = {
  EstablecimientoRut: (s, D) =>
    s.define('EstablecimientoRut', {
      establecimiento_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      rut: { type: D.STRING(20), allowNull: false, unique: true }
    }, baseOpts('establecimiento_rut')),

  PersonaDni: (s, D) =>
    s.define('PersonaDni', {
      persona_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      dni: { type: D.STRING(20), allowNull: false, unique: true }
    }, baseOpts('persona_dni')),

  PersonaFechaNacimiento: (s, D) =>
    s.define('PersonaFechaNacimiento', {
      persona_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha_nacimiento: { type: D.DATEONLY, allowNull: false }
    }, baseOpts('persona_fecha_nacimiento')),

  RolCodigo: (s, D) =>
    s.define('RolCodigo', {
      rol_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      codigo: { type: D.STRING(50), allowNull: false, unique: true }
    }, baseOpts('rol_codigo')),

  CarreraTipo: (s, D) =>
    s.define('CarreraTipo', {
      carrera_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      tipo: { type: D.STRING(40), allowNull: false }
    }, baseOpts('carrera_tipo')),

  CarreraDuracion: (s, D) =>
    s.define('CarreraDuracion', {
      carrera_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      duracion_semestres: { type: D.SMALLINT, allowNull: false }
    }, baseOpts('carrera_duracion')),

  MateriaCodigo: (s, D) =>
    s.define('MateriaCodigo', {
      materia_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      establecimiento_id: { type: D.CHAR(36), allowNull: false },
      codigo: { type: D.STRING(30), allowNull: false }
    }, baseOpts('materia_codigo')),

  PeriodoNombre: (s, D) =>
    s.define('PeriodoNombre', {
      periodo_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      nombre: { type: D.STRING(50), allowNull: false }
    }, baseOpts('periodo_nombre')),

  PeriodoTipo: (s, D) =>
    s.define('PeriodoTipo', {
      periodo_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      tipo: { type: D.STRING(20), allowNull: false }
    }, baseOpts('periodo_tipo')),

  PeriodoFechaInicio: (s, D) =>
    s.define('PeriodoFechaInicio', {
      periodo_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha_inicio: { type: D.DATEONLY, allowNull: false }
    }, baseOpts('periodo_fecha_inicio')),

  PeriodoFechaFin: (s, D) =>
    s.define('PeriodoFechaFin', {
      periodo_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha_fin: { type: D.DATEONLY, allowNull: false }
    }, baseOpts('periodo_fecha_fin')),

  HorarioDia: (s, D) =>
    s.define('HorarioDia', {
      horario_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      dia: { type: D.STRING(10), allowNull: false }
    }, baseOpts('horario_dia')),

  HorarioHoraInicio: (s, D) =>
    s.define('HorarioHoraInicio', {
      horario_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      hora_inicio: { type: D.TIME, allowNull: false }
    }, baseOpts('horario_hora_inicio')),

  HorarioHoraFin: (s, D) =>
    s.define('HorarioHoraFin', {
      horario_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      hora_fin: { type: D.TIME, allowNull: false }
    }, baseOpts('horario_hora_fin')),

  InscripcionFecha: (s, D) =>
    s.define('InscripcionFecha', {
      inscripcion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha: { type: D.DATEONLY, allowNull: false }
    }, baseOpts('inscripcion_fecha')),

  InscripcionCarrera: (s, D) =>
    s.define('InscripcionCarrera', {
      inscripcion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      carrera_id: { type: D.CHAR(36), allowNull: false }
    }, baseOpts('inscripcion_carrera')),

  EvaluacionTipo: (s, D) =>
    s.define('EvaluacionTipo', {
      evaluacion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      tipo: { type: D.STRING(20), allowNull: false }
    }, baseOpts('evaluacion_tipo')),

  EvaluacionFecha: (s, D) =>
    s.define('EvaluacionFecha', {
      evaluacion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha: { type: D.DATEONLY, allowNull: false }
    }, baseOpts('evaluacion_fecha'))
};

// =====================================================================
//  ATRIBUTOS TEMPORALES (PK = entidad_id + valid_from)
// =====================================================================

const tempAttr = (s, D, modelName, table, entityCol, attrCol, attrType) =>
  s.define(modelName, {
    ...tempPK(D, entityCol),
    [attrCol]: { type: attrType, allowNull: false }
  }, baseOpts(table));

const temporales = {
  EstablecimientoNombre: (s, D) => tempAttr(s, D, 'EstablecimientoNombre', 'establecimiento_nombre', 'establecimiento_id', 'nombre', D.STRING(150)),
  EstablecimientoTipo:   (s, D) => tempAttr(s, D, 'EstablecimientoTipo',   'establecimiento_tipo',   'establecimiento_id', 'tipo',   D.STRING(40)),
  EstablecimientoDireccion: (s, D) => tempAttr(s, D, 'EstablecimientoDireccion', 'establecimiento_direccion', 'establecimiento_id', 'direccion', D.STRING(200)),

  PersonaNombre:   (s, D) => tempAttr(s, D, 'PersonaNombre',   'persona_nombre',   'persona_id', 'nombre',   D.STRING(100)),
  PersonaApellido: (s, D) => tempAttr(s, D, 'PersonaApellido', 'persona_apellido', 'persona_id', 'apellido', D.STRING(100)),

  UsuarioEmail:    (s, D) => tempAttr(s, D, 'UsuarioEmail',    'usuario_email',    'usuario_id', 'email',         D.STRING(150)),
  UsuarioPassword: (s, D) => tempAttr(s, D, 'UsuarioPassword', 'usuario_password', 'usuario_id', 'password_hash', D.STRING(255)),

  CarreraNombre:   (s, D) => tempAttr(s, D, 'CarreraNombre',   'carrera_nombre',   'carrera_id', 'nombre', D.STRING(150)),

  MateriaNombre:         (s, D) => tempAttr(s, D, 'MateriaNombre',         'materia_nombre',         'materia_id', 'nombre',          D.STRING(150)),
  MateriaDescripcion:    (s, D) => tempAttr(s, D, 'MateriaDescripcion',    'materia_descripcion',    'materia_id', 'descripcion',     D.TEXT),
  MateriaHorasSemanales: (s, D) => tempAttr(s, D, 'MateriaHorasSemanales', 'materia_horas_semanales','materia_id', 'horas_semanales', D.SMALLINT),

  PlanEstudioNombre:  (s, D) => tempAttr(s, D, 'PlanEstudioNombre',  'plan_estudio_nombre',  'plan_id', 'nombre',  D.STRING(100)),
  PlanEstudioVigente: (s, D) => tempAttr(s, D, 'PlanEstudioVigente', 'plan_estudio_vigente', 'plan_id', 'vigente', D.BOOLEAN),

  PeriodoActivo: (s, D) => tempAttr(s, D, 'PeriodoActivo', 'periodo_activo', 'periodo_id', 'activo', D.BOOLEAN),

  AulaNombre:    (s, D) => tempAttr(s, D, 'AulaNombre',    'aula_nombre',    'aula_id', 'nombre',    D.STRING(50)),
  AulaUbicacion: (s, D) => tempAttr(s, D, 'AulaUbicacion', 'aula_ubicacion', 'aula_id', 'ubicacion', D.STRING(150)),
  AulaCapacidad: (s, D) => tempAttr(s, D, 'AulaCapacidad', 'aula_capacidad', 'aula_id', 'capacidad', D.SMALLINT),

  CursoCupo: (s, D) => tempAttr(s, D, 'CursoCupo', 'curso_cupo', 'curso_id', 'cupo', D.SMALLINT),

  CursoProfesor: (s, D) =>
    s.define('CursoProfesor', {
      ...tempPK(D, 'curso_id'),
      profesor_persona_id: { type: D.CHAR(36), allowNull: false }
    }, baseOpts('curso_profesor')),

  EvaluacionDescripcion: (s, D) => tempAttr(s, D, 'EvaluacionDescripcion', 'evaluacion_descripcion', 'evaluacion_id', 'descripcion', D.STRING(200)),
  EvaluacionPonderacion: (s, D) => tempAttr(s, D, 'EvaluacionPonderacion', 'evaluacion_ponderacion', 'evaluacion_id', 'ponderacion', D.DECIMAL(5,4)),

  PersonaTitulo:       (s, D) => tempAttr(s, D, 'PersonaTitulo',       'persona_titulo',       'persona_id', 'titulo',       D.STRING(150)),
  PersonaEspecialidad: (s, D) => tempAttr(s, D, 'PersonaEspecialidad', 'persona_especialidad', 'persona_id', 'especialidad', D.STRING(150))
};

// =====================================================================
//  RELACIONES M:N
// =====================================================================

const relaciones = {
  UsuarioRol: (s, D) =>
    s.define('UsuarioRol', {
      usuario_id:         { type: D.CHAR(36), primaryKey: true, allowNull: false },
      rol_id:             { type: D.CHAR(36), primaryKey: true, allowNull: false },
      establecimiento_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      valid_from:         { type: D.DATE,     primaryKey: true, allowNull: false },
      valid_to:           { type: D.DATE,     allowNull: true }
    }, baseOpts('usuario_rol')),

  PlanMateria: (s, D) =>
    s.define('PlanMateria', {
      plan_id:    { type: D.CHAR(36), primaryKey: true, allowNull: false },
      materia_id: { type: D.CHAR(36), primaryKey: true, allowNull: false }
    }, baseOpts('plan_materia')),

  PlanMateriaNivel: (s, D) =>
    s.define('PlanMateriaNivel', {
      plan_id:    { type: D.CHAR(36), primaryKey: true, allowNull: false },
      materia_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      nivel:      { type: D.SMALLINT, allowNull: false }
    }, baseOpts('plan_materia_nivel')),

  PlanMateriaObligatoria: (s, D) =>
    s.define('PlanMateriaObligatoria', {
      plan_id:    { type: D.CHAR(36), primaryKey: true, allowNull: false },
      materia_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      obligatoria:{ type: D.BOOLEAN,  allowNull: false }
    }, baseOpts('plan_materia_obligatoria')),

  PlanMateriaCreditos: (s, D) =>
    s.define('PlanMateriaCreditos', {
      plan_id:    { type: D.CHAR(36), primaryKey: true, allowNull: false },
      materia_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      creditos:   { type: D.DECIMAL(5,2), allowNull: false }
    }, baseOpts('plan_materia_creditos'))
};

// =====================================================================
//  HECHOS — calificaciones y asistencia
// =====================================================================

const hechos = {
  Calificacion: (s, D) =>
    s.define('Calificacion', {
      inscripcion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      evaluacion_id:  { type: D.CHAR(36), primaryKey: true, allowNull: false },
      nota:           { type: D.DECIMAL(4,2), allowNull: false }
    }, baseOpts('calificacion')),

  AsistenciaPresente: (s, D) =>
    s.define('AsistenciaPresente', {
      inscripcion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha:          { type: D.DATEONLY, primaryKey: true, allowNull: false },
      presente:       { type: D.BOOLEAN, allowNull: false }
    }, baseOpts('asistencia_presente')),

  AsistenciaJustificada: (s, D) =>
    s.define('AsistenciaJustificada', {
      inscripcion_id: { type: D.CHAR(36), primaryKey: true, allowNull: false },
      fecha:          { type: D.DATEONLY, primaryKey: true, allowNull: false },
      justificada:    { type: D.BOOLEAN, allowNull: false }
    }, baseOpts('asistencia_justificada'))
};

// =====================================================================
//  ASOCIACIONES
// =====================================================================

function defineAssociations(models) {
  const {
    Establecimiento, Persona, Usuario, Rol, Carrera, Materia,
    PlanEstudio, PeriodoAcademico, Aula, Curso, Inscripcion, Evaluacion, Horario,

    EstablecimientoNombre, EstablecimientoTipo, EstablecimientoDireccion, EstablecimientoRut,
    PersonaNombre, PersonaApellido, PersonaDni, PersonaFechaNacimiento,
    UsuarioEmail, UsuarioPassword, RolCodigo,
    CarreraNombre, CarreraTipo, CarreraDuracion,
    MateriaNombre, MateriaDescripcion, MateriaCodigo, MateriaHorasSemanales,
    PlanEstudioNombre, PlanEstudioVigente,
    PeriodoNombre, PeriodoTipo, PeriodoFechaInicio, PeriodoFechaFin, PeriodoActivo,
    AulaNombre, AulaUbicacion, AulaCapacidad,
    CursoCupo, CursoProfesor,
    EvaluacionTipo, EvaluacionDescripcion, EvaluacionPonderacion, EvaluacionFecha,
    HorarioDia, HorarioHoraInicio, HorarioHoraFin,
    InscripcionFecha, InscripcionCarrera,

    UsuarioRol,
    PlanMateria, PlanMateriaNivel, PlanMateriaObligatoria, PlanMateriaCreditos,
    Calificacion, AsistenciaPresente, AsistenciaJustificada
  } = models;

  // ── Persona / Usuario ────────────────────────────────────────────
  Usuario.belongsTo(Persona, { foreignKey: 'persona_id' });
  Persona.hasOne(Usuario, { foreignKey: 'persona_id' });

  // ── Establecimiento ──────────────────────────────────────────────
  [EstablecimientoNombre, EstablecimientoTipo, EstablecimientoDireccion, EstablecimientoRut]
    .forEach((M) => {
      M.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
      Establecimiento.hasMany(M, { foreignKey: 'establecimiento_id' });
    });

  // ── Persona attrs ────────────────────────────────────────────────
  [PersonaNombre, PersonaApellido, PersonaDni, PersonaFechaNacimiento].forEach((M) => {
    M.belongsTo(Persona, { foreignKey: 'persona_id' });
    Persona.hasMany(M, { foreignKey: 'persona_id' });
  });

  // ── Usuario attrs ────────────────────────────────────────────────
  [UsuarioEmail, UsuarioPassword].forEach((M) => {
    M.belongsTo(Usuario, { foreignKey: 'usuario_id' });
    Usuario.hasMany(M, { foreignKey: 'usuario_id' });
  });

  // ── Rol ──────────────────────────────────────────────────────────
  RolCodigo.belongsTo(Rol, { foreignKey: 'rol_id' });
  Rol.hasOne(RolCodigo, { foreignKey: 'rol_id' });

  // ── UsuarioRol (M:N temporal) ────────────────────────────────────
  UsuarioRol.belongsTo(Usuario,         { foreignKey: 'usuario_id' });
  UsuarioRol.belongsTo(Rol,             { foreignKey: 'rol_id' });
  UsuarioRol.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
  Usuario.hasMany(UsuarioRol,         { foreignKey: 'usuario_id' });
  Rol.hasMany(UsuarioRol,             { foreignKey: 'rol_id' });
  Establecimiento.hasMany(UsuarioRol, { foreignKey: 'establecimiento_id' });

  // ── Carrera ──────────────────────────────────────────────────────
  Carrera.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
  Establecimiento.hasMany(Carrera, { foreignKey: 'establecimiento_id' });
  [CarreraNombre, CarreraTipo, CarreraDuracion].forEach((M) => {
    M.belongsTo(Carrera, { foreignKey: 'carrera_id' });
    Carrera.hasMany(M, { foreignKey: 'carrera_id' });
  });

  // ── Materia ──────────────────────────────────────────────────────
  Materia.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
  Establecimiento.hasMany(Materia, { foreignKey: 'establecimiento_id' });
  [MateriaNombre, MateriaDescripcion, MateriaCodigo, MateriaHorasSemanales].forEach((M) => {
    M.belongsTo(Materia, { foreignKey: 'materia_id' });
    Materia.hasMany(M, { foreignKey: 'materia_id' });
  });

  // ── Plan estudio ─────────────────────────────────────────────────
  PlanEstudio.belongsTo(Carrera, { foreignKey: 'carrera_id' });
  Carrera.hasMany(PlanEstudio, { foreignKey: 'carrera_id' });
  [PlanEstudioNombre, PlanEstudioVigente].forEach((M) => {
    M.belongsTo(PlanEstudio, { foreignKey: 'plan_id' });
    PlanEstudio.hasMany(M, { foreignKey: 'plan_id' });
  });

  // ── Plan ↔ Materia ───────────────────────────────────────────────
  PlanMateria.belongsTo(PlanEstudio, { foreignKey: 'plan_id' });
  PlanMateria.belongsTo(Materia,     { foreignKey: 'materia_id' });
  PlanEstudio.hasMany(PlanMateria, { foreignKey: 'plan_id' });
  Materia.hasMany(PlanMateria,     { foreignKey: 'materia_id' });

  // ── Periodo académico ────────────────────────────────────────────
  PeriodoAcademico.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
  Establecimiento.hasMany(PeriodoAcademico, { foreignKey: 'establecimiento_id' });
  [PeriodoNombre, PeriodoTipo, PeriodoFechaInicio, PeriodoFechaFin, PeriodoActivo].forEach((M) => {
    M.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
    PeriodoAcademico.hasMany(M, { foreignKey: 'periodo_id' });
  });

  // ── Aula ─────────────────────────────────────────────────────────
  Aula.belongsTo(Establecimiento, { foreignKey: 'establecimiento_id' });
  Establecimiento.hasMany(Aula, { foreignKey: 'establecimiento_id' });
  [AulaNombre, AulaUbicacion, AulaCapacidad].forEach((M) => {
    M.belongsTo(Aula, { foreignKey: 'aula_id' });
    Aula.hasMany(M, { foreignKey: 'aula_id' });
  });

  // ── Curso ────────────────────────────────────────────────────────
  Curso.belongsTo(Materia,          { foreignKey: 'materia_id' });
  Curso.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
  Materia.hasMany(Curso,            { foreignKey: 'materia_id' });
  PeriodoAcademico.hasMany(Curso,   { foreignKey: 'periodo_id' });
  [CursoCupo, CursoProfesor].forEach((M) => {
    M.belongsTo(Curso, { foreignKey: 'curso_id' });
    Curso.hasMany(M, { foreignKey: 'curso_id' });
  });
  CursoProfesor.belongsTo(Persona, { foreignKey: 'profesor_persona_id' });

  // ── Inscripción ──────────────────────────────────────────────────
  Inscripcion.belongsTo(Persona, { foreignKey: 'alumno_persona_id', as: 'alumno' });
  Inscripcion.belongsTo(Curso,   { foreignKey: 'curso_id' });
  Curso.hasMany(Inscripcion, { foreignKey: 'curso_id' });
  [InscripcionFecha, InscripcionCarrera].forEach((M) => {
    M.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });
    Inscripcion.hasOne(M, { foreignKey: 'inscripcion_id' });
  });
  InscripcionCarrera.belongsTo(Carrera, { foreignKey: 'carrera_id' });

  // ── Evaluación ───────────────────────────────────────────────────
  Evaluacion.belongsTo(Curso, { foreignKey: 'curso_id' });
  Curso.hasMany(Evaluacion, { foreignKey: 'curso_id' });
  [EvaluacionTipo, EvaluacionDescripcion, EvaluacionPonderacion, EvaluacionFecha].forEach((M) => {
    M.belongsTo(Evaluacion, { foreignKey: 'evaluacion_id' });
    Evaluacion.hasMany(M, { foreignKey: 'evaluacion_id' });
  });

  // ── Horario ──────────────────────────────────────────────────────
  Horario.belongsTo(Curso, { foreignKey: 'curso_id' });
  Horario.belongsTo(Aula,  { foreignKey: 'aula_id' });
  Curso.hasMany(Horario, { foreignKey: 'curso_id' });
  Aula.hasMany(Horario,  { foreignKey: 'aula_id' });
  [HorarioDia, HorarioHoraInicio, HorarioHoraFin].forEach((M) => {
    M.belongsTo(Horario, { foreignKey: 'horario_id' });
    Horario.hasOne(M, { foreignKey: 'horario_id' });
  });

  // ── Hechos: calificaciones y asistencia ──────────────────────────
  Calificacion.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });
  Calificacion.belongsTo(Evaluacion,  { foreignKey: 'evaluacion_id' });
  Inscripcion.hasMany(Calificacion, { foreignKey: 'inscripcion_id' });
  Evaluacion.hasMany(Calificacion,  { foreignKey: 'evaluacion_id' });

  [AsistenciaPresente, AsistenciaJustificada].forEach((M) => {
    M.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });
    Inscripcion.hasMany(M, { foreignKey: 'inscripcion_id' });
  });
}

module.exports = {
  factories: { ...entidades, ...inmutables, ...temporales, ...relaciones, ...hechos },
  defineAssociations
};
