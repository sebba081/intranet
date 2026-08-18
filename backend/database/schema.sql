-- =====================================================================
--  INTRANET EDUCATIVA · Schema 6FN · MySQL 8+
-- ---------------------------------------------------------------------
--  Diseñado para soportar:
--    colegio · liceo · liceo_tecnico · cft · instituto_profesional · universidad
--
--  Convenciones 6FN aplicadas:
--    1. Cada tabla de atributo: PK + a lo más 1 atributo no-clave.
--    2. Atributos mutables -> tablas temporales con (valid_from, valid_to).
--    3. valid_to NULL  ==>  registro vigente.
--    4. Atributos inmutables (DNI, fecha_nacimiento, código) sin temporal.
--    5. Hechos atómicos (nota, presente, justificada) en tablas separadas.
--
--  Ejecutar:  mysql -u root -p intranet < schema.sql
-- =====================================================================

DROP DATABASE IF EXISTS intranet;
CREATE DATABASE intranet
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE intranet;

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================================
--  1. ENTIDADES BASE (sólo identificadores)
-- =====================================================================

CREATE TABLE establecimiento (
    id CHAR(36) NOT NULL PRIMARY KEY
) ENGINE=InnoDB;

CREATE TABLE persona (
    id CHAR(36) NOT NULL PRIMARY KEY
) ENGINE=InnoDB;

CREATE TABLE usuario (
    id CHAR(36) NOT NULL PRIMARY KEY,
    persona_id CHAR(36) NOT NULL UNIQUE,
    CONSTRAINT fk_usuario_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE rol (
    id CHAR(36) NOT NULL PRIMARY KEY
) ENGINE=InnoDB;

CREATE TABLE carrera (
    id CHAR(36) NOT NULL PRIMARY KEY,
    establecimiento_id CHAR(36) NOT NULL,
    CONSTRAINT fk_carrera_establecimiento
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE materia (
    id CHAR(36) NOT NULL PRIMARY KEY,
    establecimiento_id CHAR(36) NOT NULL,
    CONSTRAINT fk_materia_establecimiento
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE plan_estudio (
    id CHAR(36) NOT NULL PRIMARY KEY,
    carrera_id CHAR(36) NOT NULL,
    CONSTRAINT fk_plan_carrera
        FOREIGN KEY (carrera_id) REFERENCES carrera(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE periodo_academico (
    id CHAR(36) NOT NULL PRIMARY KEY,
    establecimiento_id CHAR(36) NOT NULL,
    CONSTRAINT fk_periodo_establecimiento
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE aula (
    id CHAR(36) NOT NULL PRIMARY KEY,
    establecimiento_id CHAR(36) NOT NULL,
    CONSTRAINT fk_aula_establecimiento
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE curso (
    id CHAR(36) NOT NULL PRIMARY KEY,
    materia_id CHAR(36) NOT NULL,
    periodo_id CHAR(36) NOT NULL,
    CONSTRAINT fk_curso_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE,
    CONSTRAINT fk_curso_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE,
    UNIQUE KEY uq_curso_materia_periodo (materia_id, periodo_id)
) ENGINE=InnoDB;

CREATE TABLE inscripcion (
    id CHAR(36) NOT NULL PRIMARY KEY,
    alumno_persona_id CHAR(36) NOT NULL,
    curso_id CHAR(36) NOT NULL,
    CONSTRAINT fk_inscripcion_persona
        FOREIGN KEY (alumno_persona_id) REFERENCES persona(id) ON DELETE CASCADE,
    CONSTRAINT fk_inscripcion_curso
        FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE,
    UNIQUE KEY uq_inscripcion_alumno_curso (alumno_persona_id, curso_id)
) ENGINE=InnoDB;

CREATE TABLE evaluacion (
    id CHAR(36) NOT NULL PRIMARY KEY,
    curso_id CHAR(36) NOT NULL,
    CONSTRAINT fk_evaluacion_curso
        FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE horario (
    id CHAR(36) NOT NULL PRIMARY KEY,
    curso_id CHAR(36) NOT NULL,
    aula_id CHAR(36) NOT NULL,
    CONSTRAINT fk_horario_curso
        FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE,
    CONSTRAINT fk_horario_aula
        FOREIGN KEY (aula_id) REFERENCES aula(id) ON DELETE RESTRICT
) ENGINE=InnoDB;


-- =====================================================================
--  2. ATRIBUTOS INMUTABLES (PK + 1 atributo)
-- =====================================================================

-- Establecimiento --------------------------------------------------------
CREATE TABLE establecimiento_rut (
    establecimiento_id CHAR(36) NOT NULL PRIMARY KEY,
    rut VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT fk_estab_rut
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Persona ---------------------------------------------------------------
CREATE TABLE persona_dni (
    persona_id CHAR(36) NOT NULL PRIMARY KEY,
    dni VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT fk_pdni_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE persona_fecha_nacimiento (
    persona_id CHAR(36) NOT NULL PRIMARY KEY,
    fecha_nacimiento DATE NOT NULL,
    CONSTRAINT fk_pfn_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Rol -------------------------------------------------------------------
CREATE TABLE rol_codigo (
    rol_id CHAR(36) NOT NULL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT chk_rol_codigo
        CHECK (codigo IN ('alumno','profesor','administrativo','director','apoderado')),
    CONSTRAINT fk_rolcod_rol
        FOREIGN KEY (rol_id) REFERENCES rol(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Carrera ---------------------------------------------------------------
CREATE TABLE carrera_tipo (
    carrera_id CHAR(36) NOT NULL PRIMARY KEY,
    tipo VARCHAR(40) NOT NULL,
    CONSTRAINT chk_carrera_tipo
        CHECK (tipo IN ('humanista','tecnico_profesional','tecnico_superior',
                        'licenciatura','ingenieria','otro')),
    CONSTRAINT fk_ctipo_carrera
        FOREIGN KEY (carrera_id) REFERENCES carrera(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE carrera_duracion (
    carrera_id CHAR(36) NOT NULL PRIMARY KEY,
    duracion_semestres SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT fk_cdur_carrera
        FOREIGN KEY (carrera_id) REFERENCES carrera(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Materia ---------------------------------------------------------------
CREATE TABLE materia_codigo (
    materia_id CHAR(36) NOT NULL PRIMARY KEY,
    establecimiento_id CHAR(36) NOT NULL,
    codigo VARCHAR(30) NOT NULL,
    CONSTRAINT fk_mcod_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE,
    CONSTRAINT fk_mcod_estab
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id) ON DELETE CASCADE,
    UNIQUE KEY uq_mcod_estab_codigo (establecimiento_id, codigo)
) ENGINE=InnoDB;

-- Periodo académico -----------------------------------------------------
CREATE TABLE periodo_nombre (
    periodo_id CHAR(36) NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT fk_pnom_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE periodo_tipo (
    periodo_id CHAR(36) NOT NULL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    CONSTRAINT chk_periodo_tipo
        CHECK (tipo IN ('semestre','trimestre','cuatrimestre','anual','modulo','bimestre')),
    CONSTRAINT fk_ptipo_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE periodo_fecha_inicio (
    periodo_id CHAR(36) NOT NULL PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    CONSTRAINT fk_pfi_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE periodo_fecha_fin (
    periodo_id CHAR(36) NOT NULL PRIMARY KEY,
    fecha_fin DATE NOT NULL,
    CONSTRAINT fk_pff_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Horario ---------------------------------------------------------------
CREATE TABLE horario_dia (
    horario_id CHAR(36) NOT NULL PRIMARY KEY,
    dia VARCHAR(10) NOT NULL,
    CONSTRAINT chk_horario_dia
        CHECK (dia IN ('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo')),
    CONSTRAINT fk_hdia_horario
        FOREIGN KEY (horario_id) REFERENCES horario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE horario_hora_inicio (
    horario_id CHAR(36) NOT NULL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    CONSTRAINT fk_hhi_horario
        FOREIGN KEY (horario_id) REFERENCES horario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE horario_hora_fin (
    horario_id CHAR(36) NOT NULL PRIMARY KEY,
    hora_fin TIME NOT NULL,
    CONSTRAINT fk_hhf_horario
        FOREIGN KEY (horario_id) REFERENCES horario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Inscripcion -----------------------------------------------------------
CREATE TABLE inscripcion_fecha (
    inscripcion_id CHAR(36) NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    CONSTRAINT fk_ifec_inscripcion
        FOREIGN KEY (inscripcion_id) REFERENCES inscripcion(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE inscripcion_carrera (
    inscripcion_id CHAR(36) NOT NULL PRIMARY KEY,
    carrera_id CHAR(36) NOT NULL,
    CONSTRAINT fk_icar_inscripcion
        FOREIGN KEY (inscripcion_id) REFERENCES inscripcion(id) ON DELETE CASCADE,
    CONSTRAINT fk_icar_carrera
        FOREIGN KEY (carrera_id) REFERENCES carrera(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Evaluación ------------------------------------------------------------
CREATE TABLE evaluacion_tipo (
    evaluacion_id CHAR(36) NOT NULL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    CONSTRAINT chk_eval_tipo
        CHECK (tipo IN ('parcial','examen','trabajo','promedio','control','tarea','otro')),
    CONSTRAINT fk_etipo_eval
        FOREIGN KEY (evaluacion_id) REFERENCES evaluacion(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE evaluacion_fecha (
    evaluacion_id CHAR(36) NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    CONSTRAINT fk_efec_eval
        FOREIGN KEY (evaluacion_id) REFERENCES evaluacion(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- =====================================================================
--  3. ATRIBUTOS TEMPORALES (PK compuesta con valid_from)
--      valid_to NULL = registro vigente
-- =====================================================================

-- Establecimiento --------------------------------------------------------
CREATE TABLE establecimiento_nombre (
    establecimiento_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (establecimiento_id, valid_from),
    CONSTRAINT fk_enom_estab
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE establecimiento_tipo (
    establecimiento_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    tipo VARCHAR(40) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (establecimiento_id, valid_from),
    CONSTRAINT chk_estab_tipo
        CHECK (tipo IN ('colegio','liceo','liceo_tecnico','cft',
                        'instituto_profesional','universidad')),
    CONSTRAINT fk_etipo_estab
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE establecimiento_direccion (
    establecimiento_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (establecimiento_id, valid_from),
    CONSTRAINT fk_edir_estab
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Persona ---------------------------------------------------------------
CREATE TABLE persona_nombre (
    persona_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (persona_id, valid_from),
    CONSTRAINT fk_pnom_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE persona_apellido (
    persona_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (persona_id, valid_from),
    CONSTRAINT fk_pape_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE persona_titulo (
    persona_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (persona_id, valid_from),
    CONSTRAINT fk_ptit2_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE persona_especialidad (
    persona_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    especialidad VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (persona_id, valid_from),
    CONSTRAINT fk_pesp2_persona
        FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Usuario ---------------------------------------------------------------
CREATE TABLE usuario_email (
    usuario_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    email VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (usuario_id, valid_from),
    CONSTRAINT fk_uem_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE INDEX idx_usuario_email_vigente ON usuario_email (email, valid_to);

CREATE TABLE usuario_password (
    usuario_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (usuario_id, valid_from),
    CONSTRAINT fk_upwd_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Carrera ---------------------------------------------------------------
CREATE TABLE carrera_nombre (
    carrera_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (carrera_id, valid_from),
    CONSTRAINT fk_cnom_carrera
        FOREIGN KEY (carrera_id) REFERENCES carrera(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Materia ---------------------------------------------------------------
CREATE TABLE materia_nombre (
    materia_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (materia_id, valid_from),
    CONSTRAINT fk_mnom_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE materia_descripcion (
    materia_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (materia_id, valid_from),
    CONSTRAINT fk_mdesc_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE materia_horas_semanales (
    materia_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    horas_semanales SMALLINT UNSIGNED NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (materia_id, valid_from),
    CONSTRAINT fk_mhrs_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Plan de estudio -------------------------------------------------------
CREATE TABLE plan_estudio_nombre (
    plan_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (plan_id, valid_from),
    CONSTRAINT fk_pnom_plan
        FOREIGN KEY (plan_id) REFERENCES plan_estudio(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE plan_estudio_vigente (
    plan_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    vigente BOOLEAN NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (plan_id, valid_from),
    CONSTRAINT fk_pvig_plan
        FOREIGN KEY (plan_id) REFERENCES plan_estudio(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Periodo activo --------------------------------------------------------
CREATE TABLE periodo_activo (
    periodo_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    activo BOOLEAN NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (periodo_id, valid_from),
    CONSTRAINT fk_pact_periodo
        FOREIGN KEY (periodo_id) REFERENCES periodo_academico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Aula ------------------------------------------------------------------
CREATE TABLE aula_nombre (
    aula_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (aula_id, valid_from),
    CONSTRAINT fk_anom_aula
        FOREIGN KEY (aula_id) REFERENCES aula(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE aula_ubicacion (
    aula_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (aula_id, valid_from),
    CONSTRAINT fk_aubi_aula
        FOREIGN KEY (aula_id) REFERENCES aula(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE aula_capacidad (
    aula_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    capacidad SMALLINT UNSIGNED NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (aula_id, valid_from),
    CONSTRAINT fk_acap_aula
        FOREIGN KEY (aula_id) REFERENCES aula(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Curso -----------------------------------------------------------------
CREATE TABLE curso_cupo (
    curso_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    cupo SMALLINT UNSIGNED NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (curso_id, valid_from),
    CONSTRAINT fk_ccup_curso
        FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Profesor del curso (puede cambiar a lo largo del período) -------------
CREATE TABLE curso_profesor (
    curso_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    profesor_persona_id CHAR(36) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (curso_id, valid_from),
    CONSTRAINT fk_cprof_curso
        FOREIGN KEY (curso_id) REFERENCES curso(id) ON DELETE CASCADE,
    CONSTRAINT fk_cprof_persona
        FOREIGN KEY (profesor_persona_id) REFERENCES persona(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Evaluación ------------------------------------------------------------
CREATE TABLE evaluacion_descripcion (
    evaluacion_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (evaluacion_id, valid_from),
    CONSTRAINT fk_edesc_eval
        FOREIGN KEY (evaluacion_id) REFERENCES evaluacion(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE evaluacion_ponderacion (
    evaluacion_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    ponderacion DECIMAL(5,4) NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (evaluacion_id, valid_from),
    CONSTRAINT chk_ponderacion
        CHECK (ponderacion >= 0 AND ponderacion <= 1),
    CONSTRAINT fk_epon_eval
        FOREIGN KEY (evaluacion_id) REFERENCES evaluacion(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- =====================================================================
--  4. RELACIONES M:N (asignación rol, plan-materia)
-- =====================================================================

-- Asignación de rol a un usuario en un establecimiento (temporal) -------
CREATE TABLE usuario_rol (
    usuario_id CHAR(36) NOT NULL,
    rol_id CHAR(36) NOT NULL,
    establecimiento_id CHAR(36) NOT NULL,
    valid_from DATETIME NOT NULL,
    valid_to DATETIME NULL,
    PRIMARY KEY (usuario_id, rol_id, establecimiento_id, valid_from),
    CONSTRAINT fk_ur_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_ur_rol
        FOREIGN KEY (rol_id) REFERENCES rol(id) ON DELETE RESTRICT,
    CONSTRAINT fk_ur_estab
        FOREIGN KEY (establecimiento_id) REFERENCES establecimiento(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Pivote plan ↔ materia: la entidad "plan_materia" + atributos en tablas separadas
CREATE TABLE plan_materia (
    plan_id CHAR(36) NOT NULL,
    materia_id CHAR(36) NOT NULL,
    PRIMARY KEY (plan_id, materia_id),
    CONSTRAINT fk_pm_plan
        FOREIGN KEY (plan_id) REFERENCES plan_estudio(id) ON DELETE CASCADE,
    CONSTRAINT fk_pm_materia
        FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE plan_materia_nivel (
    plan_id CHAR(36) NOT NULL,
    materia_id CHAR(36) NOT NULL,
    nivel SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (plan_id, materia_id),
    CONSTRAINT fk_pmn_pm
        FOREIGN KEY (plan_id, materia_id) REFERENCES plan_materia(plan_id, materia_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE plan_materia_obligatoria (
    plan_id CHAR(36) NOT NULL,
    materia_id CHAR(36) NOT NULL,
    obligatoria BOOLEAN NOT NULL,
    PRIMARY KEY (plan_id, materia_id),
    CONSTRAINT fk_pmo_pm
        FOREIGN KEY (plan_id, materia_id) REFERENCES plan_materia(plan_id, materia_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE plan_materia_creditos (
    plan_id CHAR(36) NOT NULL,
    materia_id CHAR(36) NOT NULL,
    creditos DECIMAL(5,2) NOT NULL,
    PRIMARY KEY (plan_id, materia_id),
    CONSTRAINT fk_pmc_pm
        FOREIGN KEY (plan_id, materia_id) REFERENCES plan_materia(plan_id, materia_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


-- =====================================================================
--  5. HECHOS — calificaciones y asistencia
--  En 6FN cada hecho atómico va en su propia tabla.
-- =====================================================================

-- Nota obtenida por una inscripcion en una evaluacion ------------------
CREATE TABLE calificacion (
    inscripcion_id CHAR(36) NOT NULL,
    evaluacion_id CHAR(36) NOT NULL,
    nota DECIMAL(4,2) NOT NULL,
    PRIMARY KEY (inscripcion_id, evaluacion_id),
    CONSTRAINT fk_cal_inscripcion
        FOREIGN KEY (inscripcion_id) REFERENCES inscripcion(id) ON DELETE CASCADE,
    CONSTRAINT fk_cal_evaluacion
        FOREIGN KEY (evaluacion_id) REFERENCES evaluacion(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Asistencia: presencia y justificación como hechos separados ----------
CREATE TABLE asistencia_presente (
    inscripcion_id CHAR(36) NOT NULL,
    fecha DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    PRIMARY KEY (inscripcion_id, fecha),
    CONSTRAINT fk_apre_inscripcion
        FOREIGN KEY (inscripcion_id) REFERENCES inscripcion(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE asistencia_justificada (
    inscripcion_id CHAR(36) NOT NULL,
    fecha DATE NOT NULL,
    justificada BOOLEAN NOT NULL,
    PRIMARY KEY (inscripcion_id, fecha),
    CONSTRAINT fk_ajus_inscripcion
        FOREIGN KEY (inscripcion_id) REFERENCES inscripcion(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- =====================================================================
--  6. VISTAS DE CONVENIENCIA — estado vigente desnormalizado
--  Para la API: en vez de hacer 15 JOINs cada query, se consulta la vista.
-- =====================================================================

CREATE OR REPLACE VIEW v_establecimiento AS
SELECT  e.id,
        en.nombre,
        et.tipo,
        ed.direccion,
        er.rut
FROM establecimiento e
LEFT JOIN establecimiento_nombre en
       ON en.establecimiento_id = e.id AND en.valid_to IS NULL
LEFT JOIN establecimiento_tipo et
       ON et.establecimiento_id = e.id AND et.valid_to IS NULL
LEFT JOIN establecimiento_direccion ed
       ON ed.establecimiento_id = e.id AND ed.valid_to IS NULL
LEFT JOIN establecimiento_rut er
       ON er.establecimiento_id = e.id;

CREATE OR REPLACE VIEW v_persona AS
SELECT  p.id,
        pn.nombre,
        pa.apellido,
        pd.dni,
        pfn.fecha_nacimiento,
        pt.titulo,
        pe.especialidad
FROM persona p
LEFT JOIN persona_nombre pn ON pn.persona_id = p.id AND pn.valid_to IS NULL
LEFT JOIN persona_apellido pa ON pa.persona_id = p.id AND pa.valid_to IS NULL
LEFT JOIN persona_dni pd ON pd.persona_id = p.id
LEFT JOIN persona_fecha_nacimiento pfn ON pfn.persona_id = p.id
LEFT JOIN persona_titulo pt ON pt.persona_id = p.id AND pt.valid_to IS NULL
LEFT JOIN persona_especialidad pe ON pe.persona_id = p.id AND pe.valid_to IS NULL;

CREATE OR REPLACE VIEW v_usuario AS
SELECT  u.id,
        u.persona_id,
        ue.email,
        up.password_hash
FROM usuario u
LEFT JOIN usuario_email ue ON ue.usuario_id = u.id AND ue.valid_to IS NULL
LEFT JOIN usuario_password up ON up.usuario_id = u.id AND up.valid_to IS NULL;

CREATE OR REPLACE VIEW v_usuario_roles_vigentes AS
SELECT  ur.usuario_id,
        ur.establecimiento_id,
        rc.codigo AS rol
FROM usuario_rol ur
JOIN rol_codigo rc ON rc.rol_id = ur.rol_id
WHERE ur.valid_to IS NULL;

CREATE OR REPLACE VIEW v_carrera AS
SELECT  c.id,
        c.establecimiento_id,
        cn.nombre,
        ct.tipo,
        cd.duracion_semestres
FROM carrera c
LEFT JOIN carrera_nombre cn ON cn.carrera_id = c.id AND cn.valid_to IS NULL
LEFT JOIN carrera_tipo ct ON ct.carrera_id = c.id
LEFT JOIN carrera_duracion cd ON cd.carrera_id = c.id;

CREATE OR REPLACE VIEW v_materia AS
SELECT  m.id,
        m.establecimiento_id,
        mn.nombre,
        md.descripcion,
        mc.codigo,
        mhs.horas_semanales
FROM materia m
LEFT JOIN materia_nombre mn ON mn.materia_id = m.id AND mn.valid_to IS NULL
LEFT JOIN materia_descripcion md ON md.materia_id = m.id AND md.valid_to IS NULL
LEFT JOIN materia_codigo mc ON mc.materia_id = m.id
LEFT JOIN materia_horas_semanales mhs ON mhs.materia_id = m.id AND mhs.valid_to IS NULL;

CREATE OR REPLACE VIEW v_periodo AS
SELECT  pa.id,
        pa.establecimiento_id,
        pn.nombre,
        pt.tipo,
        pfi.fecha_inicio,
        pff.fecha_fin,
        pact.activo
FROM periodo_academico pa
LEFT JOIN periodo_nombre pn ON pn.periodo_id = pa.id
LEFT JOIN periodo_tipo pt ON pt.periodo_id = pa.id
LEFT JOIN periodo_fecha_inicio pfi ON pfi.periodo_id = pa.id
LEFT JOIN periodo_fecha_fin pff ON pff.periodo_id = pa.id
LEFT JOIN periodo_activo pact ON pact.periodo_id = pa.id AND pact.valid_to IS NULL;

CREATE OR REPLACE VIEW v_aula AS
SELECT  a.id,
        a.establecimiento_id,
        an.nombre,
        au.ubicacion,
        ac.capacidad
FROM aula a
LEFT JOIN aula_nombre an ON an.aula_id = a.id AND an.valid_to IS NULL
LEFT JOIN aula_ubicacion au ON au.aula_id = a.id AND au.valid_to IS NULL
LEFT JOIN aula_capacidad ac ON ac.aula_id = a.id AND ac.valid_to IS NULL;

CREATE OR REPLACE VIEW v_curso AS
SELECT  c.id,
        c.materia_id,
        c.periodo_id,
        cp.profesor_persona_id,
        cc.cupo
FROM curso c
LEFT JOIN curso_profesor cp ON cp.curso_id = c.id AND cp.valid_to IS NULL
LEFT JOIN curso_cupo cc ON cc.curso_id = c.id AND cc.valid_to IS NULL;

CREATE OR REPLACE VIEW v_horario AS
SELECT  h.id,
        h.curso_id,
        h.aula_id,
        hd.dia,
        hhi.hora_inicio,
        hhf.hora_fin
FROM horario h
LEFT JOIN horario_dia hd ON hd.horario_id = h.id
LEFT JOIN horario_hora_inicio hhi ON hhi.horario_id = h.id
LEFT JOIN horario_hora_fin hhf ON hhf.horario_id = h.id;

CREATE OR REPLACE VIEW v_inscripcion AS
SELECT  i.id,
        i.alumno_persona_id,
        i.curso_id,
        ic.carrera_id,
        ifec.fecha
FROM inscripcion i
LEFT JOIN inscripcion_carrera ic ON ic.inscripcion_id = i.id
LEFT JOIN inscripcion_fecha ifec ON ifec.inscripcion_id = i.id;

CREATE OR REPLACE VIEW v_evaluacion AS
SELECT  e.id,
        e.curso_id,
        et.tipo,
        ed.descripcion,
        ep.ponderacion,
        ef.fecha
FROM evaluacion e
LEFT JOIN evaluacion_tipo et ON et.evaluacion_id = e.id
LEFT JOIN evaluacion_descripcion ed ON ed.evaluacion_id = e.id AND ed.valid_to IS NULL
LEFT JOIN evaluacion_ponderacion ep ON ep.evaluacion_id = e.id AND ep.valid_to IS NULL
LEFT JOIN evaluacion_fecha ef ON ef.evaluacion_id = e.id;

CREATE OR REPLACE VIEW v_calificacion AS
SELECT  c.inscripcion_id,
        c.evaluacion_id,
        c.nota
FROM calificacion c;

CREATE OR REPLACE VIEW v_asistencia AS
SELECT  ap.inscripcion_id,
        ap.fecha,
        ap.presente,
        COALESCE(aj.justificada, FALSE) AS justificada
FROM asistencia_presente ap
LEFT JOIN asistencia_justificada aj
       ON aj.inscripcion_id = ap.inscripcion_id AND aj.fecha = ap.fecha;

CREATE OR REPLACE VIEW v_plan_materia AS
SELECT  pm.plan_id,
        pm.materia_id,
        pmn.nivel,
        pmo.obligatoria,
        pmc.creditos
FROM plan_materia pm
LEFT JOIN plan_materia_nivel pmn
       ON pmn.plan_id = pm.plan_id AND pmn.materia_id = pm.materia_id
LEFT JOIN plan_materia_obligatoria pmo
       ON pmo.plan_id = pm.plan_id AND pmo.materia_id = pm.materia_id
LEFT JOIN plan_materia_creditos pmc
       ON pmc.plan_id = pm.plan_id AND pmc.materia_id = pm.materia_id;


-- =====================================================================
--  7. SEED — roles base
-- =====================================================================

INSERT INTO rol (id) VALUES
  (UUID()), (UUID()), (UUID()), (UUID()), (UUID());

INSERT INTO rol_codigo (rol_id, codigo)
SELECT id, codigo FROM (
    SELECT id, @codes := IF(@codes IS NULL, 'alumno',
              CASE @codes
                WHEN 'alumno'         THEN 'profesor'
                WHEN 'profesor'       THEN 'administrativo'
                WHEN 'administrativo' THEN 'director'
                WHEN 'director'       THEN 'apoderado'
              END) AS codigo
    FROM rol, (SELECT @codes := NULL) v
    ORDER BY id
) seeded;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================================
--  Fin del schema
--  Total tablas: ~50  ·  Vistas: 15
-- =====================================================================
