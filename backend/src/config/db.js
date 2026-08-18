'use strict';

/**
 * Instancia única de Sequelize usada por toda la aplicación.
 * Los modelos (`src/models`) y los servicios se apoyan en esta conexión.
 */

const { Sequelize } = require('sequelize');
const env = require('./env');
const configuraciones = require('./database');

const config = configuraciones[env.nodeEnv] || configuraciones.development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  charset: config.charset,
  define: { charset: config.charset, collate: config.collate },
  logging: config.logging === undefined ? console.log : config.logging
});

/** Verifica que la base de datos responda antes de levantar el servidor. */
async function conectar() {
  await sequelize.authenticate();
  return sequelize;
}

module.exports = { sequelize, Sequelize, conectar, config };
