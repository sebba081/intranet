'use strict';

/**
 * Alta y modificación de personas (núcleo del modelo 6FN).
 * Alumnos, profesores y administradores son personas con un rol asignado.
 */

const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const { actualizarAtributos } = require('./temporal.service');

/**
 * Crea la persona y todos sus atributos informados.
 * @param {import('../types').DatosPersona} datos
 * @param {import('sequelize').Transaction} t
 * @returns {Promise<string>} id de la persona creada
 */
async function crearPersona({ nombre, apellido, dni, fecha_nacimiento, titulo, especialidad }, t) {
  const personaId = uuidv4();
  const now = new Date();

  await db.Persona.create({ id: personaId }, { transaction: t });
  await db.PersonaNombre.create({ persona_id: personaId, valid_from: now, nombre }, { transaction: t });
  await db.PersonaApellido.create({ persona_id: personaId, valid_from: now, apellido }, { transaction: t });
  if (dni) await db.PersonaDni.create({ persona_id: personaId, dni }, { transaction: t });
  if (fecha_nacimiento) await db.PersonaFechaNacimiento.create({ persona_id: personaId, fecha_nacimiento }, { transaction: t });
  if (titulo) await db.PersonaTitulo.create({ persona_id: personaId, valid_from: now, titulo }, { transaction: t });
  if (especialidad) await db.PersonaEspecialidad.create({ persona_id: personaId, valid_from: now, especialidad }, { transaction: t });

  return personaId;
}

/**
 * Actualiza los atributos mutables de una persona.
 * @param {string} personaId
 * @param {Partial<import('../types').DatosPersona>} datos
 * @param {import('sequelize').Transaction} t
 */
async function actualizarPersona(personaId, { nombre, apellido, titulo, especialidad }, t) {
  return actualizarAtributos(
    [
      [db.PersonaNombre, 'nombre', nombre],
      [db.PersonaApellido, 'apellido', apellido],
      [db.PersonaTitulo, 'titulo', titulo],
      [db.PersonaEspecialidad, 'especialidad', especialidad]
    ],
    'persona_id',
    personaId,
    t
  );
}

/** Busca una persona por PK. Devuelve null si no existe. */
const buscarPersona = (personaId) => db.Persona.findByPk(personaId);

/** Elimina la persona; el borrado en cascada arrastra usuario y atributos. */
async function eliminarPersona(persona, t) {
  return persona.destroy({ transaction: t });
}

module.exports = { crearPersona, actualizarPersona, buscarPersona, eliminarPersona };
