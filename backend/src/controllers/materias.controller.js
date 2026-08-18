'use strict';

/**
 * Controladores de /api/materias.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/materias.service');

/** GET /api/materias */
const listar = catchAsync(async (req, res) => {
  const { establecimiento_id } = req.query;
  ok(res, await service.listar({ establecimiento_id }));
}, 'Error al obtener materias');

/** GET /api/materias/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener materia');

/** POST /api/materias */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear materia');

/** PUT /api/materias/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar materia');

/** DELETE /api/materias/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar materia');

module.exports = { listar, obtener, crear, actualizar, eliminar };
