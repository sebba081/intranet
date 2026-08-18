'use strict';

/**
 * Controladores de /api/cursos.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/cursos.service');

/** GET /api/cursos */
const listar = catchAsync(async (req, res) => {
  const { periodo_id, materia_id } = req.query;
  ok(res, await service.listar({ periodo_id, materia_id }));
}, 'Error al obtener cursos');

/** GET /api/cursos/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener curso');

/** POST /api/cursos */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear curso');

/** PUT /api/cursos/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar curso');

/** DELETE /api/cursos/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar curso');

module.exports = { listar, obtener, crear, actualizar, eliminar };
