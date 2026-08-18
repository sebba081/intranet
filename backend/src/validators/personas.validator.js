'use strict';

/**
 * Validaciones comunes a alumnos, profesores y administradores.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['nombre', 'apellido', 'email', 'password', 'establecimiento_id'],
    'nombre, apellido, email, password y establecimiento_id son obligatorios'
  )
];

module.exports = { crear };
