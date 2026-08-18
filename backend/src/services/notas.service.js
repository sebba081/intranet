'use strict';

/**
 * Calificaciones: hecho atómico (inscripcion_id, evaluacion_id) -> nota.
 * La clave es compuesta, por eso no hay un id propio.
 */

const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');

const SQL_POR_CLAVE = 'SELECT * FROM v_calificacion WHERE inscripcion_id = ? AND evaluacion_id = ?';

const porClave = (inscripcionId, evaluacionId) => queryUna(SQL_POR_CLAVE, [inscripcionId, evaluacionId]);

function listar({ inscripcion_id, evaluacion_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_calificacion', { inscripcion_id, evaluacion_id });
  return queryVista(sql, params);
}

async function obtener(inscripcionId, evaluacionId) {
  const fila = await porClave(inscripcionId, evaluacionId);
  if (!fila) throw new NotFoundError('Calificación');
  return fila;
}

async function crear({ inscripcion_id, evaluacion_id, nota }) {
  await db.Calificacion.create({ inscripcion_id, evaluacion_id, nota });
  return porClave(inscripcion_id, evaluacion_id);
}

async function actualizar(inscripcionId, evaluacionId, { nota }) {
  const [filas] = await db.Calificacion.update(
    { nota },
    { where: { inscripcion_id: inscripcionId, evaluacion_id: evaluacionId } }
  );
  if (!filas) throw new NotFoundError('Calificación');
  return porClave(inscripcionId, evaluacionId);
}

async function eliminar(inscripcionId, evaluacionId) {
  const filas = await db.Calificacion.destroy({
    where: { inscripcion_id: inscripcionId, evaluacion_id: evaluacionId }
  });
  if (!filas) throw new NotFoundError('Calificación');
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
