'use strict';

/**
 * Configuración de conexión por entorno.
 *
 * Es consumida tanto por `config/db.js` (runtime) como por sequelize-cli
 * (ver `.sequelizerc` en la raíz del repositorio), por lo que debe exportar
 * un objeto con una clave por entorno.
 */

const env = require('./env');

const base = {
  username: env.db.username,
  password: env.db.password,
  host: env.db.host,
  port: env.db.port,
  dialect: env.db.dialect,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
};

module.exports = {
  development: { ...base, database: env.db.name },
  test: { ...base, database: `${env.db.name}_test`, logging: false },
  production: { ...base, database: `${env.db.name}_prod`, logging: false }
};
