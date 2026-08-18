'use strict';

/**
 * Validaciones de /api/asistencia.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['inscripcion_id', 'fecha', 'presente'],
    'inscripcion_id, fecha y presente son obligatorios'
  )
];

module.exports = { crear };
