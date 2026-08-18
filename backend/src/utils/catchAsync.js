'use strict';

/**
 * Envuelve un handler asíncrono para que cualquier rechazo llegue al
 * middleware de errores en vez de dejar la petición colgada.
 *
 * El segundo parámetro es el mensaje público que se usará si el error no es
 * un AppError (por ejemplo, una falla inesperada de la base de datos).
 *
 *   exports.listar = catchAsync(handler, 'Error al obtener usuarios');
 */
function catchAsync(fn, mensajePublico) {
  return function handlerEnvuelto(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (mensajePublico && !error.mensajePublico) error.mensajePublico = mensajePublico;
      next(error);
    });
  };
}

module.exports = catchAsync;
