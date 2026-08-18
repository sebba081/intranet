'use strict';

/**
 * Controladores de /api/evaluaciones.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/evaluaciones.service');

/** GET /api/evaluaciones */
const listar = catchAsync(async (req, res) => {
  const { curso_id } = req.query;
  ok(res, await service.listar({ curso_id }));
}, 'Error al obtener evaluaciones');

/** GET /api/evaluaciones/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener evaluación');

/** POST /api/evaluaciones */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear evaluación');

/** PUT /api/evaluaciones/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar evaluación');

/** DELETE /api/evaluaciones/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar evaluación');

module.exports = { listar, obtener, crear, actualizar, eliminar };
