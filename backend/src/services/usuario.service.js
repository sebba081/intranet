'use strict';

/**
 * Altas y consultas de usuarios: credenciales y rol vigente.
 */

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models');
const env = require('../config/env');
const { queryVista, queryUna } = require('./query.service');
const { actualizarAtributo, actualizarAtributos } = require('./temporal.service');
const { BadRequestError } = require('../utils/AppError');

/** SELECT base: usuario + persona + rol vigente. */
const SQL_USUARIO = `
  SELECT  u.id AS usuario_id,
          u.persona_id,
          vp.nombre, vp.apellido, vp.dni, vp.fecha_nacimiento,
          vp.titulo, vp.especialidad,
          vu.email,
          vur.rol,
          vur.establecimiento_id
  FROM usuario u
  JOIN v_persona vp ON vp.id = u.persona_id
  JOIN v_usuario vu ON vu.id = u.id
  LEFT JOIN v_usuario_roles_vigentes vur ON vur.usuario_id = u.id
`;

const listar = () => queryVista(SQL_USUARIO);

const obtener = (usuarioId) => queryUna(`${SQL_USUARIO} WHERE u.id = ?`, [usuarioId]);

/** Traduce el código de rol ('alumno', 'profesor', ...) a su id. */
async function resolverRolId(codigoRol) {
  const fila = await queryUna('SELECT rol_id FROM rol_codigo WHERE codigo = ?', [codigoRol]);
  if (!fila) throw new BadRequestError(`Rol desconocido: ${codigoRol}`);
  return fila.rol_id;
}

/** Hashea la contraseña con el coste configurado en el entorno. */
const hashPassword = (password) => bcrypt.hash(password, env.saltRounds);

/**
 * Crea usuario + email + password + rol vigente para una persona existente.
 * @param {import('../types').DatosUsuario} datos
 * @param {import('sequelize').Transaction} t
 * @returns {Promise<string>} id del usuario creado
 */
async function crearUsuario({ persona_id, email, password, rol, establecimiento_id }, t) {
  const usuarioId = uuidv4();
  const now = new Date();
  const hash = await hashPassword(password);
  const rolId = await resolverRolId(rol);

  await db.Usuario.create({ id: usuarioId, persona_id }, { transaction: t });
  await db.UsuarioEmail.create({ usuario_id: usuarioId, valid_from: now, email }, { transaction: t });
  await db.UsuarioPassword.create({ usuario_id: usuarioId, valid_from: now, password_hash: hash }, { transaction: t });
  await db.UsuarioRol.create(
    { usuario_id: usuarioId, rol_id: rolId, establecimiento_id, valid_from: now, valid_to: null },
    { transaction: t }
  );

  return usuarioId;
}

/** Actualiza email y/o contraseña del usuario. */
async function actualizarCredenciales(usuarioId, { email, password }, t) {
  await actualizarAtributos([[db.UsuarioEmail, 'email', email]], 'usuario_id', usuarioId, t);
  if (password) {
    const hash = await hashPassword(password);
    await actualizarAtributo(db.UsuarioPassword, 'usuario_id', usuarioId, 'password_hash', hash, t);
  }
}

/** Usuario asociado a una persona (o null). */
const buscarPorPersona = (personaId) => db.Usuario.findOne({ where: { persona_id: personaId } });

module.exports = {
  SQL_USUARIO,
  listar,
  obtener,
  crearUsuario,
  actualizarCredenciales,
  buscarPorPersona,
  resolverRolId,
  hashPassword
};
