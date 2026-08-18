'use strict';

/**
 * Validaciones de /api/horarios.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios, valorEnLista } = require('../middlewares/validate.middleware');
const { DIAS } = require('../services/horarios.service');

const crear = [
  camposObligatorios(
    ['curso_id', 'aula_id', 'dia', 'hora_inicio', 'hora_fin'],
    'Todos los campos son obligatorios'
  ),
  valorEnLista('dia', DIAS, `dia debe ser: ${DIAS.join(', ')}`)
];

module.exports = { crear };
