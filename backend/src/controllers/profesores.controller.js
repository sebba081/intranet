'use strict';

/**
 * Controladores de /api/profesores.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/profesores.service');

/** GET /api/profesores */
const listar = catchAsync(async (req, res) => {
  ok(res, await service.listar());
}, 'Error al obtener profesores');

/** GET /api/profesores/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener profesor');

/** POST /api/profesores */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear profesor');

/** PUT /api/profesores/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar profesor');

/** DELETE /api/profesores/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar profesor');

module.exports = { listar, obtener, crear, actualizar, eliminar };
