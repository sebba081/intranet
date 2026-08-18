'use strict';

/**
 * Períodos académicos.
 * Nombre y fechas son inmutables por diseño 6FN: sólo `activo` cambia.
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna, aplicarFiltros } = require('./query.service');
const { actualizarAtributo } = require('./temporal.service');

const TIPOS = ['semestre', 'trimestre', 'cuatrimestre', 'anual', 'modulo', 'bimestre'];

const porId = (id) => queryUna('SELECT * FROM v_periodo WHERE id = ?', [id]);

function listar({ establecimiento_id } = {}) {
  const { sql, params } = aplicarFiltros('SELECT * FROM v_periodo', { establecimiento_id });
  return queryVista(sql, params);
}

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Período');
  return fila;
}

async function crear({ nombre, tipo, fecha_inicio, fecha_fin, establecimiento_id, activo = true }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.PeriodoAcademico.create({ id, establecimiento_id }, { transaction: t });
    await db.PeriodoNombre.create({ periodo_id: id, nombre }, { transaction: t });
    await db.PeriodoTipo.create({ periodo_id: id, tipo }, { transaction: t });
    await db.PeriodoFechaInicio.create({ periodo_id: id, fecha_inicio }, { transaction: t });
    await db.PeriodoFechaFin.create({ periodo_id: id, fecha_fin }, { transaction: t });
    await db.PeriodoActivo.create({ periodo_id: id, valid_from: now, activo }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { activo }) {
  const periodo = await db.PeriodoAcademico.findByPk(id);
  if (!periodo) throw new NotFoundError('Período');

  if (activo != null) {
    await db.sequelize.transaction(async (t) => {
      await actualizarAtributo(db.PeriodoActivo, 'periodo_id', id, 'activo', activo, t);
    });
  }

  return porId(id);
}

async function eliminar(id) {
  const periodo = await db.PeriodoAcademico.findByPk(id);
  if (!periodo) throw new NotFoundError('Período');
  await periodo.destroy();
}

module.exports = { TIPOS, listar, obtener, crear, actualizar, eliminar };
