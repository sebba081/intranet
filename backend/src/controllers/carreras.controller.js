'use strict';

/**
 * Controladores de /api/carreras.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/carreras.service');

/** GET /api/carreras */
const listar = catchAsync(async (req, res) => {
  const { establecimiento_id } = req.query;
  ok(res, await service.listar({ establecimiento_id }));
}, 'Error al obtener carreras');

/** GET /api/carreras/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener carrera');

/** POST /api/carreras */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear carrera');

/** PUT /api/carreras/:id */
const actualizar = catchAsync(async (req, res) => {
  ok(res, await service.actualizar(req.params.id, req.body));
}, 'Error al actualizar carrera');

/** DELETE /api/carreras/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar carrera');

module.exports = { listar, obtener, crear, actualizar, eliminar };
