'use strict';

/**
 * Casos de uso de /api/usuarios: alta completa (persona + usuario + rol) y
 * mantenimiento de sus atributos mutables.
 */

const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const personaService = require('./persona.service');
const usuarioService = require('./usuario.service');

const listar = () => usuarioService.listar();

async function obtener(usuarioId) {
  const usuario = await usuarioService.obtener(usuarioId);
  if (!usuario) throw new NotFoundError('Usuario');
  return usuario;
}

/** Crea persona, usuario y rol dentro de una única transacción. */
async function crear(datos) {
  let usuarioId;

  await db.sequelize.transaction(async (t) => {
    const personaId = await personaService.crearPersona(datos, t);
    usuarioId = await usuarioService.crearUsuario({ ...datos, persona_id: personaId }, t);
  });

  return usuarioService.obtener(usuarioId);
}

/** Actualiza nombre/apellido/título/especialidad y credenciales. */
async function actualizar(usuarioId, datos) {
  const usuario = await db.Usuario.findByPk(usuarioId);
  if (!usuario) throw new NotFoundError('Usuario');

  await db.sequelize.transaction(async (t) => {
    await personaService.actualizarPersona(usuario.persona_id, datos, t);
    await usuarioService.actualizarCredenciales(usuarioId, datos, t);
  });

  return usuarioService.obtener(usuarioId);
}

/** Elimina el usuario y su persona (cascada sobre los atributos). */
async function eliminar(usuarioId) {
  const usuario = await db.Usuario.findByPk(usuarioId);
  if (!usuario) throw new NotFoundError('Usuario');

  const persona = await personaService.buscarPersona(usuario.persona_id);

  await db.sequelize.transaction(async (t) => {
    await usuario.destroy({ transaction: t });
    if (persona) await personaService.eliminarPersona(persona, t);
  });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
