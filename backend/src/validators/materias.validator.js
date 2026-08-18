'use strict';

/**
 * Validaciones de /api/materias.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['nombre', 'codigo', 'establecimiento_id'],
    'nombre, codigo y establecimiento_id son obligatorios'
  )
];

module.exports = { crear };
