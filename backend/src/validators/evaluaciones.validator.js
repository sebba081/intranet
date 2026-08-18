'use strict';

/**
 * Validaciones de /api/evaluaciones.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios, valorEnLista } = require('../middlewares/validate.middleware');
const { TIPOS } = require('../services/evaluaciones.service');

const crear = [
  camposObligatorios(['curso_id', 'tipo', 'fecha'], 'curso_id, tipo y fecha son obligatorios'),
  valorEnLista('tipo', TIPOS)
];

module.exports = { crear };
