'use strict';

/**
 * Controladores de /api/horarios.
 * Traducen HTTP <-> servicio: no contienen SQL ni reglas de negocio.
 */

const catchAsync = require('../utils/catchAsync');
const { ok, creado, sinContenido } = require('../utils/httpResponse');
const service = require('../services/horarios.service');

/** GET /api/horarios */
const listar = catchAsync(async (req, res) => {
  const { curso_id } = req.query;
  ok(res, await service.listar({ curso_id }));
}, 'Error al obtener horarios');

/** GET /api/horarios/:id */
const obtener = catchAsync(async (req, res) => {
  ok(res, await service.obtener(req.params.id));
}, 'Error al obtener horario');

/** POST /api/horarios */
const crear = catchAsync(async (req, res) => {
  creado(res, await service.crear(req.body));
}, 'Error al crear horario');

/** DELETE /api/horarios/:id */
const eliminar = catchAsync(async (req, res) => {
  await service.eliminar(req.params.id);
  sinContenido(res);
}, 'Error al eliminar horario');

module.exports = { listar, obtener, crear, eliminar };
