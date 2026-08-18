'use strict';

/**
 * Cursos en 6FN:
 *   - Entidad Curso: materia_id + periodo_id (inmutables, identifican al curso)
 *   - CursoProfesor: quién lo dicta (temporal)
 *   - CursoCupo: cuántos alumnos admite (temporal)
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const porId = (id) => queryUna('SELECT * FROM v_curso WHERE id = ?', [id]);

function listar({ periodo_id, materia_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_curso', { periodo_id, materia_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Curso');
  return fila;
}

async function crear({ materia_id, periodo_id, profesor_persona_id, cupo }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Curso.create({ id, materia_id, periodo_id }, { transaction: t });
    await db.CursoProfesor.create({ curso_id: id, valid_from: now, profesor_persona_id }, { transaction: t });
    await db.CursoCupo.create({ curso_id: id, valid_from: now, cupo }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { profesor_persona_id, cupo }) {
  const curso = await db.Curso.findByPk(id);
  if (!curso) throw new NotFoundError('Curso');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos(
      [
        [db.CursoProfesor, 'profesor_persona_id', profesor_persona_id],
        [db.CursoCupo, 'cupo', cupo]
      ],
      'curso_id',
      id,
      t
    );
  });

  return porId(id);
}

async function eliminar(id) {
  const curso = await db.Curso.findByPk(id);
  if (!curso) throw new NotFoundError('Curso');
  await curso.destroy();
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
