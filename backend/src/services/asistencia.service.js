'use strict';

/**
 * Asistencia: hechos (presente, justificada) por inscripción y fecha.
 * La clave es compuesta (inscripcion_id, fecha).
 */

const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');

const SQL_POR_CLAVE = 'SELECT * FROM v_asistencia WHERE inscripcion_id = ? AND fecha = ?';

const porClave = (inscripcionId, fecha) => queryUna(SQL_POR_CLAVE, [inscripcionId, fecha]);

function listar({ inscripcion_id, fecha } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_asistencia', { inscripcion_id, fecha });
  return queryVista(sql, params);
}

async function registrar({ inscripcion_id, fecha, presente, justificada = false }) {
  await db.sequelize.transaction(async (t) => {
    await db.AsistenciaPresente.create({ inscripcion_id, fecha, presente }, { transaction: t });
    if (justificada != null) {
      await db.AsistenciaJustificada.create({ inscripcion_id, fecha, justificada }, { transaction: t });
    }
  });

  return porClave(inscripcion_id, fecha);
}

async function actualizar(inscripcionId, fecha, { presente, justificada }) {
  await db.sequelize.transaction(async (t) => {
    if (presente != null) {
      await db.AsistenciaPresente.update(
        { presente },
        { where: { inscripcion_id: inscripcionId, fecha }, transaction: t }
      );
    }
    if (justificada != null) {
      const [filas] = await db.AsistenciaJustificada.update(
        { justificada },
        { where: { inscripcion_id: inscripcionId, fecha }, transaction: t }
      );
      if (!filas) {
        await db.AsistenciaJustificada.create(
          { inscripcion_id: inscripcionId, fecha, justificada },
          { transaction: t }
        );
      }
    }
  });

  const fila = await porClave(inscripcionId, fecha);
  if (!fila) throw new NotFoundError('Asistencia');
  return fila;
}

async function eliminar(inscripcionId, fecha) {
  const filas = await db.AsistenciaPresente.destroy({
    where: { inscripcion_id: inscripcionId, fecha }
  });
  if (!filas) throw new NotFoundError('Asistencia');
  await db.AsistenciaJustificada.destroy({ where: { inscripcion_id: inscripcionId, fecha } });
}

module.exports = { listar, registrar, actualizar, eliminar };
