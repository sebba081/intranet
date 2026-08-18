'use strict';

/**
 * Validaciones de /api/notas.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios } = require('../middlewares/validate.middleware');

const crear = [
  camposObligatorios(
    ['inscripcion_id', 'evaluacion_id', 'nota'],
    'inscripcion_id, evaluacion_id y nota son obligatorios'
  )
];

const actualizar = [camposObligatorios(['nota'], 'nota es obligatoria')];

module.exports = { crear, actualizar };
