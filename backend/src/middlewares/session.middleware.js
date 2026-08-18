'use strict';

/**
 * Sesión de usuario basada en cookie.
 * La cookie sólo viaja por HTTPS en producción.
 */

const session = require('express-session');
const env = require('../config/env');

module.exports = session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.isProduction
  }
});
