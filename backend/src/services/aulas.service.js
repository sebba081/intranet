'use strict';

/** Aulas físicas de cada establecimiento. */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const porId = (id) => queryUna('SELECT * FROM v_aula WHERE id = ?', [id]);

function listar({ establecimiento_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_aula', { establecimiento_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Aula');
  return fila;
}

async function crear({ nombre, ubicacion, capacidad, establecimiento_id }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Aula.create({ id, establecimiento_id }, { transaction: t });
    await db.AulaNombre.create({ aula_id: id, valid_from: now, nombre }, { transaction: t });
    await db.AulaUbicacion.create({ aula_id: id, valid_from: now, ubicacion }, { transaction: t });
    await db.AulaCapacidad.create({ aula_id: id, valid_from: now, capacidad }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { nombre, ubicacion, capacidad }) {
  const aula = await db.Aula.findByPk(id);
  if (!aula) throw new NotFoundError('Aula');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos(
      [
        [db.AulaNombre, 'nombre', nombre],
        [db.AulaUbicacion, 'ubicacion', ubicacion],
        [db.AulaCapacidad, 'capacidad', capacidad]
      ],
      'aula_id',
      id,
      t
    );
  });

  return porId(id);
}

async function eliminar(id) {
  const aula = await db.Aula.findByPk(id);
  if (!aula) throw new NotFoundError('Aula');
  await aula.destroy();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
