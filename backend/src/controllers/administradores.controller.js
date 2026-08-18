'use strict';

/**
 * Controladores de /api/administradores.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/administradores.service');

/** GET /api/administradores */
const listar = catchAsync(async (req, res) => {
  ok(res, await service.listar());
}, 'Error al obtener administradores');

/** GET /api/administradores/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener administrador');

/** POST /api/administradores */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear administrador');

/** PUT /api/administradores/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar administrador');

/** DELETE /api/administradores/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar administrador');

module.exports = { listar, obtener, crear, actualizar, eliminar };
