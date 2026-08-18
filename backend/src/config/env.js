'use strict';

/**
 * Carga y normaliza la configuración de entorno.
 *
 * Lee `backend/.env` (si existe) sin dependencias externas y expone un objeto
 * plano y tipado por defecto. Cualquier variable ya presente en `process.env`
 * tiene prioridad sobre el archivo.
 */

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.resolve(__dirname, '../../.env');

function cargarArchivoEnv(ruta) {
  if (!fs.existsSync(ruta)) return;

  const contenido = fs.readFileSync(ruta, 'utf8');
  for (const linea of contenido.split(/\r?\n/)) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#')) continue;

    const separador = limpia.indexOf('=');
    if (separador === -1) continue;

    const clave = limpia.slice(0, separador).trim();
    let valor = limpia.slice(separador + 1).trim();
    if (/^(".*"|'.*')$/.test(valor)) valor = valor.slice(1, -1);

    if (process.env[clave] === undefined) process.env[clave] = valor;
  }
}

cargarArchivoEnv(ENV_FILE);

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3001),
  sessionSecret: process.env.SESSION_SECRET || 'intranet-dev-secret',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'intranet',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  saltRounds: Number(process.env.SALT_ROUNDS || 10)
};

env.isProduction = env.nodeEnv === 'production';
env.isTest = env.nodeEnv === 'test';

module.exports = env;
