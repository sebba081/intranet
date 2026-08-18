'use strict';

/**
 * Cualquier ruta que no coincida con la API cae aquí y responde 404 en JSON
 * (evita devolver el HTML por defecto de Express).
 */

const { AppError } = require('../utils/AppError');

function notFoundMiddleware(req, res, next) {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFoundMiddleware;
