'use strict';

/**
 * Validaciones de /api/inscripciones.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['alumno_persona_id', 'curso_id'],
    'alumno_persona_id y curso_id son obligatorios'
  )
];

module.exports = { crear };
