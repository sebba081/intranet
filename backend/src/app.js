'use strict';

/**
 * Construcción de la aplicación Express (sin escuchar puerto).
 * Mantenerla separada de `server.js` permite montarla en los tests con
 * supertest sin abrir sockets.
 *
 * El backend es sólo API: los estáticos los sirve Next.js desde `frontend/`.
 */

const express = require('express');
const session = require('./middlewares/session.middleware');
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// ── Parseo de body y sesión ─────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);

// ── API ─────────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRoutes);

// ── Errores (siempre al final) ──────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
