'use strict';

/**
 * Controladores de /api/inscripciones.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/inscripciones.service');

/** GET /api/inscripciones */
const listar = catchAsync(async (req, res) => {
  const { curso_id, alumno_persona_id } = req.query;
  ok(res, await service.listar({ curso_id, alumno_persona_id }));
}, 'Error al obtener inscripciones');

/** GET /api/inscripciones/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener inscripción');

/** POST /api/inscripciones */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear inscripción');

/** DELETE /api/inscripciones/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar inscripción');

module.exports = { listar, obtener, crear, eliminar };
