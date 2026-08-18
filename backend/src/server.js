'use strict';

/**
 * Punto de entrada del servidor: conecta a la base de datos y escucha.
 */

const app = require('./app');
const env = require('./config/env');
const { conectar } = require('./config/db');

async function iniciar() {
  try {
    await conectar();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }

  app.listen(env.port, () => {
    console.log(`API corriendo en http://localhost:${env.port}`);
  });
}

iniciar();

module.exports = { iniciar };
