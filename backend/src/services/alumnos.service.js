'use strict';

/**
 * Alumnos = personas con rol 'alumno' vigente.
 * En 6FN no existe una tabla "alumnos".
 */

const { crearServicioPersonaRol } = require('./personasPorRol.service');

module.exports = crearServicioPersonaRol({
  entidad: 'Alumno',
  rol: 'alumno',
  columnas: 'vp.nombre, vp.apellido, vp.dni, vp.fecha_nacimiento'
});
