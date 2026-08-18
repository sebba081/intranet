'use strict';

/**
 * Manejador central de errores.
 * Es el último middleware montado en `app.js`: todo `next(error)` termina aquí.
 */

const { AppError } = require('../utils/AppError');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error.toJSON());
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Ya existe un registro con ese valor único' });
  }

  console.error(error);
  return res.status(500).json({
    error: error.mensajePublico || 'Error interno',
    detalle: error.message
  });
}

module.exports = errorMiddleware;
