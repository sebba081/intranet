'use strict';

/**
 * Profesores = personas con rol 'profesor' vigente.
 * Suman título y especialidad como atributos docentes.
 */

const { crearServicioPersonaRol } = require('./personasPorRol.service');

module.exports = crearServicioPersonaRol({
  entidad: 'Profesor',
  rol: 'profesor',
  columnas: 'vp.nombre, vp.apellido, vp.dni, vp.fecha_nacimiento, vp.titulo, vp.especialidad'
});
