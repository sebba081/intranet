'use strict';

/**
 * Tipos compartidos del backend, declarados con JSDoc para que el editor
 * ofrezca autocompletado sin necesidad de compilar TypeScript.
 *
 * @typedef {'alumno'|'profesor'|'administrativo'|'director'|'apoderado'} RolCodigo
 *
 * @typedef {Object} DatosPersona
 * @property {string} nombre
 * @property {string} apellido
 * @property {string} [dni]
 * @property {string} [fecha_nacimiento]
 * @property {string} [titulo]
 * @property {string} [especialidad]
 *
 * @typedef {Object} DatosUsuario
 * @property {string} persona_id
 * @property {string} email
 * @property {string} password
 * @property {RolCodigo} rol
 * @property {string} establecimiento_id
 *
 * @typedef {import('sequelize').Transaction} Transaccion
 */

module.exports = {};
