'use strict';

/** Materias (asignaturas) del catálogo de cada establecimiento. */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const porId = (id) => queryUna('SELECT * FROM v_materia WHERE id = ?', [id]);

function listar({ establecimiento_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_materia', { establecimiento_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Materia');
  return fila;
}

async function crear({ nombre, codigo, descripcion, horas_semanales, establecimiento_id }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Materia.create({ id, establecimiento_id }, { transaction: t });
    await db.MateriaNombre.create({ materia_id: id, valid_from: now, nombre }, { transaction: t });
    await db.MateriaCodigo.create({ materia_id: id, establecimiento_id, codigo }, { transaction: t });
    if (descripcion) await db.MateriaDescripcion.create({ materia_id: id, valid_from: now, descripcion }, { transaction: t });
    if (horas_semanales != null) await db.MateriaHorasSemanales.create({ materia_id: id, valid_from: now, horas_semanales }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { nombre, descripcion, horas_semanales }) {
  const materia = await db.Materia.findByPk(id);
  if (!materia) throw new NotFoundError('Materia');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos(
      [
        [db.MateriaNombre, 'nombre', nombre],
        [db.MateriaDescripcion, 'descripcion', descripcion],
        [db.MateriaHorasSemanales, 'horas_semanales', horas_semanales]
      ],
      'materia_id',
      id,
      t
    );
  });

  return porId(id);
}

async function eliminar(id) {
  const materia = await db.Materia.findByPk(id);
  if (!materia) throw new NotFoundError('Materia');
  await materia.destroy();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
