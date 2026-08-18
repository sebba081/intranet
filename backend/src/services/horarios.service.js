'use strict';

/**
 * Bloques horarios de un curso en un aula.
 * Sus atributos son inmutables en 6FN: para "editar" se elimina y se recrea.
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

const porId = (id) => queryUna('SELECT * FROM v_horario WHERE id = ?', [id]);

function listar({ curso_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_horario', { curso_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Horario');
  return fila;
}

async function crear({ curso_id, aula_id, dia, hora_inicio, hora_fin }) {
  const id = uuidv4();

  await db.sequelize.transaction(async (t) => {
    await db.Horario.create({ id, curso_id, aula_id }, { transaction: t });
    await db.HorarioDia.create({ horario_id: id, dia }, { transaction: t });
    await db.HorarioHoraInicio.create({ horario_id: id, hora_inicio }, { transaction: t });
    await db.HorarioHoraFin.create({ horario_id: id, hora_fin }, { transaction: t });
  });

  return porId(id);
}

async function eliminar(id) {
  const horario = await db.Horario.findByPk(id);
  if (!horario) throw new NotFoundError('Horario');
  await horario.destroy();
}

module.exports = { DIAS, listar, obtener, crear, eliminar };
