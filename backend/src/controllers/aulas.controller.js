'use strict';

/**
 * Controladores de /api/aulas.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/aulas.service');

/** GET /api/aulas */
const listar = catchAsync(async (req, res) => {
  const { establecimiento_id } = req.query;
  ok(res, await service.listar({ establecimiento_id }));
}, 'Error al obtener aulas');

/** GET /api/aulas/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener aula');

/** POST /api/aulas */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear aula');

/** PUT /api/aulas/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar aula');

/** DELETE /api/aulas/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar aula');

module.exports = { listar, obtener, crear, actualizar, eliminar };
