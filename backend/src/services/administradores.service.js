'use strict';

/** Administradores = personas con rol 'administrativo' vigente. */

const { crearServicioPersonaRol } = require('./personasPorRol.service');

module.exports = crearServicioPersonaRol({
  entidad: 'Administrador',
  rol: 'administrativo',
  columnas: 'vp.nombre, vp.apellido, vp.dni'
});
