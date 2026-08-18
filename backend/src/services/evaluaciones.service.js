'use strict';

/**
 * Evaluaciones: instancias evaluativas dentro de un curso
 * (ej: "Parcial 1", "Examen Final", "Trabajo práctico").
 * Toda calificación referencia una evaluación.
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const TIPOS = ['parcial', 'examen', 'trabajo', 'promedio', 'control', 'tarea', 'otro'];

const porId = (id) => queryUna('SELECT * FROM v_evaluacion WHERE id = ?', [id]);

function listar({ curso_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_evaluacion', { curso_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Evaluación');
  return fila;
}

async function crear({ curso_id, tipo, descripcion, ponderacion, fecha }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Evaluacion.create({ id, curso_id }, { transaction: t });
    await db.EvaluacionTipo.create({ evaluacion_id: id, tipo }, { transaction: t });
    await db.EvaluacionFecha.create({ evaluacion_id: id, fecha }, { transaction: t });
    if (descripcion) await db.EvaluacionDescripcion.create({ evaluacion_id: id, valid_from: now, descripcion }, { transaction: t });
    if (ponderacion != null) await db.EvaluacionPonderacion.create({ evaluacion_id: id, valid_from: now, ponderacion }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { descripcion, ponderacion }) {
  const evaluacion = await db.Evaluacion.findByPk(id);
  if (!evaluacion) throw new NotFoundError('Evaluación');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos(
      [
        [db.EvaluacionDescripcion, 'descripcion', descripcion],
        [db.EvaluacionPonderacion, 'ponderacion', ponderacion]
      ],
      'evaluacion_id',
      id,
      t
    );
  });

  return porId(id);
}

async function eliminar(id) {
  const evaluacion = await db.Evaluacion.findByPk(id);
  if (!evaluacion) throw new NotFoundError('Evaluación');
  await evaluacion.destroy();
}

module.exports = { TIPOS, listar, obtener, crear, actualizar, eliminar };
