'use strict';

/**
 * Validaciones de /api/carreras.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['nombre', 'tipo', 'establecimiento_id'],
    'nombre, tipo y establecimiento_id son obligatorios'
  )
];

module.exports = { crear };
