'use strict';

/**
 * Controladores de /api/establecimientos.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/establecimientos.service');

/** GET /api/establecimientos */
const listar = catchAsync(async (req, res) => {
  ok(res, await service.listar());
}, 'Error al obtener establecimientos');

/** GET /api/establecimientos/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener establecimiento');

/** POST /api/establecimientos */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear establecimiento');

/** PUT /api/establecimientos/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar establecimiento');

/** DELETE /api/establecimientos/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar establecimiento');

module.exports = { listar, obtener, crear, actualizar, eliminar };
