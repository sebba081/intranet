'use strict';

/**
 * Validaciones de /api/usuarios.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['nombre', 'apellido', 'email', 'password', 'rol', 'establecimiento_id'],
    'nombre, apellido, email, password, rol y establecimiento_id son obligatorios'
  )
];

module.exports = { crear };
