'use strict';

/**
 * Controladores de /api/usuarios.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/usuarios.service');

/** GET /api/usuarios */
const listar = catchAsync(async (req, res) => {
  ok(res, await service.listar());
}, 'Error al obtener usuarios');

/** GET /api/usuarios/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener usuario');

/** POST /api/usuarios */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear usuario');

/** PUT /api/usuarios/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar usuario');

/** DELETE /api/usuarios/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar usuario');

module.exports = { listar, obtener, crear, actualizar, eliminar };
