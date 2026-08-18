'use strict';

/**
 * Controladores de /api/asistencia.
 * La clave es compuesta: (inscripcion_id, fecha).
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/asistencia.service');

/** GET /api/asistencia?inscripcion_id=...&fecha=... */
const listar = catchAsync(async (req, res) => {
  const { inscripcion_id, fecha } = req.query;
  ok(res, await service.listar({ inscripcion_id, fecha }));
}, 'Error al obtener asistencia');

/** POST /api/asistencia */
const registrar = catchAsync(async (req, res) => {
  creado(res, await service.registrar(req.body));
}, 'Error al registrar asistencia');

/** PUT /api/asistencia/:inscripcion_id/:fecha */
const actualizar = catchAsync(async (req, res) => {
  const { inscripcion_id, fecha } = req.params;
  ok(res, await service.actualizar(inscripcion_id, fecha, req.body));
}, 'Error al actualizar asistencia');

/** DELETE /api/asistencia/:inscripcion_id/:fecha */
const eliminar = catchAsync(async (req, res) => {
  const { inscripcion_id, fecha } = req.params;
  await service.eliminar(inscripcion_id, fecha);
  sinContenido(res);
}, 'Error al eliminar asistencia');

module.exports = { listar, registrar, actualizar, eliminar };
