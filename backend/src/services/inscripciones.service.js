'use strict';

/**
 * Inscripciones: alumno_persona_id + curso_id identifican la inscripción.
 * Es la entidad que enlaza al alumno con sus notas y su asistencia.
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');

const porId = (id) => queryUna('SELECT * FROM v_inscripcion WHERE id = ?', [id]);

function listar({ curso_id, alumno_persona_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_inscripcion', { curso_id, alumno_persona_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Inscripción');
  return fila;
}

async function crear({ alumno_persona_id, curso_id, carrera_id, fecha }) {
  const id = uuidv4();
  const fechaUso = fecha || new Date().toISOString().slice(0, 10);

  await db.sequelize.transaction(async (t) => {
    await db.Inscripcion.create({ id, alumno_persona_id, curso_id }, { transaction: t });
    await db.InscripcionFecha.create({ inscripcion_id: id, fecha: fechaUso }, { transaction: t });
    if (carrera_id) await db.InscripcionCarrera.create({ inscripcion_id: id, carrera_id }, { transaction: t });
  });

  return porId(id);
}

async function eliminar(id) {
  const inscripcion = await db.Inscripcion.findByPk(id);
  if (!inscripcion) throw new NotFoundError('Inscripción');
  await inscripcion.destroy();
}

module.exports = { listar, obtener, crear, eliminar };
