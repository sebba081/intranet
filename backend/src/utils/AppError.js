'use strict';

/**
 * Error de aplicación con código HTTP.
 * El middleware de errores lo traduce directamente a una respuesta JSON.
 */
class AppError extends Error {
  constructor(mensaje, statusCode = 500, detalle = undefined) {
    super(mensaje);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.detalle = detalle;
    this.esOperacional = true;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return this.detalle ? { error: this.message, detalle: this.detalle } : { error: this.message };
  }
}

/** 400 — el cliente envió datos incompletos o inválidos. */
class BadRequestError extends AppError {
  constructor(mensaje) {
    super(mensaje, 400);
    this.name = 'BadRequestError';
  }
}

/** 404 — el recurso solicitado no existe. */
class NotFoundError extends AppError {
  constructor(entidad = 'Registro') {
    super(`${entidad} no encontrado/a`, 404);
    this.name = 'NotFoundError';
  }
}

/** 409 — conflicto con un registro existente (índice único). */
class ConflictError extends AppError {
  constructor(mensaje = 'Ya existe un registro con ese valor único') {
    super(mensaje, 409);
    this.name = 'ConflictError';
  }
}

module.exports = { AppError, BadRequestError, NotFoundError, ConflictError };
