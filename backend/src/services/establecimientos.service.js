'use strict';

/** Establecimientos: colegios, liceos, CFT, institutos y universidades. */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna } = require('./query.service');
const { actualizarAtributos } = require('./temporal.service');

const TIPOS = ['colegio', 'liceo', 'liceo_tecnico', 'cft', 'instituto_profesional', 'universidad'];

const porId = (id) => queryUna('SELECT * FROM v_establecimiento WHERE id = ?', [id]);

const listar = () => queryVista('SELECT * FROM v_establecimiento');

async function obtener(id) {
  const fila = await porId(id);
  if (!fila) throw new NotFoundError('Establecimiento');
  return fila;
}

async function crear({ nombre, tipo, rut, direccion }) {
  const id = uuidv4();
  const now = new Date();

  await db.sequelize.transaction(async (t) => {
    await db.Establecimiento.create({ id }, { transaction: t });
    await db.EstablecimientoNombre.create({ establecimiento_id: id, valid_from: now, nombre }, { transaction: t });
    await db.EstablecimientoTipo.create({ establecimiento_id: id, valid_from: now, tipo }, { transaction: t });
    if (rut) await db.EstablecimientoRut.create({ establecimiento_id: id, rut }, { transaction: t });
    if (direccion) await db.EstablecimientoDireccion.create({ establecimiento_id: id, valid_from: now, direccion }, { transaction: t });
  });

  return porId(id);
}

async function actualizar(id, { nombre, tipo, direccion }) {
  if (!(await porId(id))) throw new NotFoundError('Establecimiento');

  await db.sequelize.transaction(async (t) => {
    await actualizarAtributos(
      [
        [db.EstablecimientoNombre, 'nombre', nombre],
        [db.EstablecimientoTipo, 'tipo', tipo],
        [db.EstablecimientoDireccion, 'direccion', direccion]
      ],
      'establecimiento_id',
      id,
      t
    );
  });

  return porId(id);
}

async function eliminar(id) {
  const establecimiento = await db.Establecimiento.findByPk(id);
  if (!establecimiento) throw new NotFoundError('Establecimiento');
  await establecimiento.destroy();
}

module.exports = { TIPOS, listar, obtener, crear, actualizar, eliminar };
