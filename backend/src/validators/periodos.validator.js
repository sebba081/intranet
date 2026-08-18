'use strict';

/**
 * Validaciones de /api/periodos.
 * Se monta antes del controlador, de modo que nunca reciba un body incompleto.
 */

const { camposObligatorios, valorEnLista } = require('../middlewares/validate.middleware');
const { TIPOS } = require('../services/periodos.service');

const crear = [
  camposObligatorios(
    ['nombre', 'tipo', 'fecha_inicio', 'fecha_fin', 'establecimiento_id'],
    'nombre, tipo, fecha_inicio, fecha_fin y establecimiento_id son obligatorios'
  ),
  valorEnLista('tipo', TIPOS)
];

module.exports = { crear };
