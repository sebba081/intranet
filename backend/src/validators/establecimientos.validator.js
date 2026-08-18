'use strict';

/**
 * Validaciones de /api/establecimientos.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios, valorEnLista } = require('../middlewares/validate.middleware');
const { TIPOS } = require('../services/establecimientos.service');

const MSG_TIPO = `tipo debe ser uno de: ${TIPOS.join(', ')}`;

const crear = [
  camposObligatorios(['nombre', 'tipo'], 'nombre y tipo son obligatorios'),
  valorEnLista('tipo', TIPOS, MSG_TIPO)
];

const actualizar = [valorEnLista('tipo', TIPOS, MSG_TIPO)];

module.exports = { crear, actualizar };
