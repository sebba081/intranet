'use strict';

/**
 * Router raíz de la API: monta cada recurso bajo /api.
 *
 * El orden agrupa los recursos por dominio para que el mapa de endpoints se
 * lea igual que el modelo de datos.
 */

const { Router } = require('express');

const router = Router();

// ── Personas / usuarios ─────────────────────────────────────────────────────
router.use('/usuarios', require('./usuarios.routes'));
router.use('/alumnos', require('./alumnos.routes'));
router.use('/profesores', require('./profesores.routes'));
router.use('/administradores', require('./administradores.routes'));

// ── Instituciones ───────────────────────────────────────────────────────────
router.use('/establecimientos', require('./establecimientos.routes'));

// ── Estructura académica ────────────────────────────────────────────────────
router.use('/carreras', require('./carreras.routes'));
router.use('/materias', require('./materias.routes'));
router.use('/periodos', require('./periodos.routes'));

// ── Operación ───────────────────────────────────────────────────────────────
router.use('/cursos', require('./cursos.routes'));
router.use('/aulas', require('./aulas.routes'));
router.use('/horarios', require('./horarios.routes'));

// ── Seguimiento ─────────────────────────────────────────────────────────────
router.use('/inscripciones', require('./inscripciones.routes'));
router.use('/evaluaciones', require('./evaluaciones.routes'));
router.use('/notas', require('./notas.routes'));
router.use('/asistencia', require('./asistencia.routes'));

module.exports = router;
