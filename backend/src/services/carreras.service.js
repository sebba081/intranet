'use strict';

/** Carreras y sus planes, siempre dentro de un establecimiento. */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const porId = (id) => queryUna('SELECT * FROM v_carrera WHERE id = ?', [id]);

function listar({ establecimiento_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_carrera', { establecimiento_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Carrera');
  return fila;
}

async function crear({ nombre, tipo, duracion_semestres, establecimiento_id }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Carrera.create({ id, establecimiento_id }, { transaction: t });
    await db.CarreraNombre.create({ carrera_id: id, valid_from: now, nombre }, { transaction: t });
    await db.CarreraTipo.create({ carrera_id: id, tipo }, { transaction: t });
    if (duracion_semestres != null) {
      await db.CarreraDuracion.create({ carrera_id: id, duracion_semestres }, { transaction: t });
    }
  });

  return porId(id);
}

async function actualizar(id, { nombre }) {
  const carrera = await db.Carrera.findByPk(id);
  if (!carrera) throw new NotFoundError('Carrera');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos([[db.CarreraNombre, 'nombre', nombre]], 'carrera_id', id, t);
  });

  return porId(id);
}

async function eliminar(id) {
  const carrera = await db.Carrera.findByPk(id);
  if (!carrera) throw new NotFoundError('Carrera');
  await carrera.destroy();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
