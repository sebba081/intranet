'use strict';

/**
 * Respuestas HTTP estándar de la API.
 * Centralizarlas evita que cada controlador invente su propio formato.
 */

const ok = (res, data) => res.status(200).json(data);
const creado = (res, data) => res.status(201).json(data);
const sinContenido = (res) => res.status(204).end();

module.exports = { ok, creado, sinContenido };
