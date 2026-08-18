'use strict';

/**
 * Controladores de /api/periodos.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/periodos.service');

/** GET /api/periodos */
const listar = catchAsync(async (req, res) => {
  const { establecimiento_id } = req.query;
  ok(res, await service.listar({ establecimiento_id }));
}, 'Error al obtener períodos');

/** GET /api/periodos/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener período');

/** POST /api/periodos */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear período');

/** PUT /api/periodos/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar período');

/** DELETE /api/periodos/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar período');

module.exports = { listar, obtener, crear, actualizar, eliminar };
