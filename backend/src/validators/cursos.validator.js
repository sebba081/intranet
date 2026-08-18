'use strict';

/**
 * Validaciones de /api/cursos.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['materia_id', 'periodo_id', 'profesor_persona_id', 'cupo'],
    'materia_id, periodo_id, profesor_persona_id y cupo son obligatorios'
  )
];

module.exports = { crear };
