'use strict';

/**
 * Controladores de /api/notas (calificaciones).
 * La clave es compuesta: (inscripcion_id, evaluacion_id).
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/notas.service');

/** GET /api/notas?inscripcion_id=...&evaluacion_id=... */
const listar = catchAsync(async (req, res) => {
  const { inscripcion_id, evaluacion_id } = req.query;
  ok(res, await service.listar({ inscripcion_id, evaluacion_id }));
}, 'Error al obtener calificaciones');

/** GET /api/notas/:inscripcion_id/:evaluacion_id */
const obtener = catchAsync(async (req, res) => {
  const { inscripcion_id, evaluacion_id } = req.params;
  ok(res, await service.obtener(inscripcion_id, evaluacion_id));
}, 'Error al obtener calificación');

/** POST /api/notas */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear calificación');

/** PUT /api/notas/:inscripcion_id/:evaluacion_id */
const actualizar = catchAsync(async (req, res) => {
  const { inscripcion_id, evaluacion_id } = req.params;
  ok(res, await service.actualizar(inscripcion_id, evaluacion_id, req.body));
}, 'Error al actualizar calificación');

/** DELETE /api/notas/:inscripcion_id/:evaluacion_id */
const eliminar = catchAsync(async (req, res) => {
  const { inscripcion_id, evaluacion_id } = req.params;
  await service.eliminar(inscripcion_id, evaluacion_id);
  sinContenido(res);
}, 'Error al eliminar calificación');

module.exports = { listar, obtener, crear, actualizar, eliminar };
