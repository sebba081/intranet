'use strict';

/**
 * Controladores de /api/alumnos.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/alumnos.service');

/** GET /api/alumnos */
const listar = catchAsync(async (req, res) => {
  ok(res, await service.listar());
}, 'Error al obtener alumnos');

/** GET /api/alumnos/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener alumno');

/** POST /api/alumnos */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear alumno');

/** PUT /api/alumnos/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar alumno');

/** DELETE /api/alumnos/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar alumno');

module.exports = { listar, obtener, crear, actualizar, eliminar };
