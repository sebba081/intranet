'use strict';

/**
 * Fábrica de servicios para los perfiles que en 6FN son "persona + rol":
 * alumnos, profesores y administradores comparten exactamente el mismo flujo
 * y sólo cambian el rol, la entidad del mensaje de error y las columnas
 * expuestas por la consulta.
 */

const db = require('../models');
const { NotFoundError } = require('../utils/AppError');
const { queryVista, queryUna } = require('./query.service');
const personaService = require('./persona.service');
const usuarioService = require('./usuario.service');

/**
 * @param {Object} opciones
 * @param {string} opciones.entidad     nombre para los mensajes ('Alumno')
 * @param {import('../types').RolCodigo} opciones.rol
 * @param {string} opciones.columnas    columnas extra del SELECT
 */
function crearServicioPersonaRol({ entidad, rol, columnas }) {
  const SQL = `
    SELECT  u.id AS usuario_id,
            u.persona_id AS id,
            ${columnas},
            vu.email,
            vur.establecimiento_id
    FROM usuario u
    JOIN v_persona vp ON vp.id = u.persona_id
    JOIN v_usuario vu ON vu.id = u.id
    JOIN v_usuario_roles_vigentes vur ON vur.usuario_id = u.id
    WHERE vur.rol = '${rol}'
  `;

  const porPersona = (personaId) => queryUna(`${SQL} AND u.persona_id = ?`, [personaId]);

  const listar = () => queryVista(SQL);

  async function obtener(personaId) {
    const fila = await porPersona(personaId);
    if (!fila) throw new NotFoundError(entidad);
    return fila;
  }

  async function crear(datos) {
    let personaId;

    await db.sequelize.transaction(async (t) => {
      personaId = await personaService.crearPersona(datos, t);
      await usuarioService.crearUsuario({ ...datos, persona_id: personaId, rol }, t);
    });

    return porPersona(personaId);
  }

  async function actualizar(personaId, datos) {
    const persona = await personaService.buscarPersona(personaId);
    if (!persona) throw new NotFoundError(entidad);

    const usuario = await usuarioService.buscarPorPersona(personaId);

    await db.sequelize.transaction(async (t) => {
      await personaService.actualizarPersona(personaId, datos, t);
      if (usuario) await usuarioService.actualizarCredenciales(usuario.id, { email: datos.email }, t);
    });

    return porPersona(personaId);
  }

  async function eliminar(personaId) {
    const persona = await personaService.buscarPersona(personaId);
    if (!persona) throw new NotFoundError(entidad);
    await personaService.eliminarPersona(persona);
  }

  return { SQL, listar, obtener, crear, actualizar, eliminar };
}

module.exports = { crearServicioPersonaRol };
