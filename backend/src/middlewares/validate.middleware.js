'use strict';

/**
 * Helpers de validación reutilizados por `src/validators`.
 *
 * Cada validador de entidad se arma componiendo estas funciones, de modo que
 * los controladores reciban siempre un `req.body` con los campos mínimos.
 */

const { BadRequestError } = require('../utils/AppError');

const estaVacio = (valor) => valor === undefined || valor === null || valor === '';

/**
 * Exige que `campos` estén presentes en el body.
 * @param {string[]} campos
 * @param {string} [mensaje] mensaje alternativo al generado automáticamente
 */
function camposObligatorios(campos, mensaje) {
  return function validarCampos(req, res, next) {
    const faltantes = campos.filter((campo) => estaVacio(req.body?.[campo]));
    if (!faltantes.length) return next();
    return next(new BadRequestError(mensaje || `${campos.join(', ')} son obligatorios`));
  };
}

/**
 * Exige que `campo`, si viene informado, pertenezca a `valores`.
 * @param {string} campo
 * @param {string[]} valores
 * @param {string} [mensaje]
 */
function valorEnLista(campo, valores, mensaje) {
  return function validarEnum(req, res, next) {
    const valor = req.body?.[campo];
    if (estaVacio(valor) || valores.includes(valor)) return next();
    return next(new BadRequestError(mensaje || `${campo} debe ser: ${valores.join(', ')}`));
  };
}

/** Encadena varios middlewares de validación en uno solo. */
const combinar = (...validadores) => validadores;

module.exports = { camposObligatorios, valorEnLista, combinar, estaVacio };
