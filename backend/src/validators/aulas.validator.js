'use strict';

/**
 * Validaciones de /api/aulas.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['nombre', 'ubicacion', 'capacidad', 'establecimiento_id'],
    'nombre, ubicacion, capacidad y establecimiento_id son obligatorios'
  )
];

module.exports = { crear };
