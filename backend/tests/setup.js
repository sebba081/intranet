'use strict';

/**
 * Setup global de Jest para tests de integración con MySQL.
 *
 * 1. Conecta a intranet_test (MySQL)
 * 2. Corre schema.sql completo (DROP + CREATE DATABASE + tablas + vistas + seed roles)
 * 3. Crea un establecimiento base accesible desde las suites como ESTAB_ID
 *
 * Requiere que MySQL esté corriendo y las credenciales de config/config.json sean válidas.
 */

const fs   = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = async () => {
  const { sequelize } = require('../src/models');

  // Ejecutar schema.sql contra intranet_test
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  const statements = sql
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  // El schema.sql hace DROP DATABASE intranet + CREATE DATABASE intranet.
  // Cuando NODE_ENV=test el config usa intranet_test, así que el schema
  // debe ejecutarse sin autenticación inicial a una base específica.
  // Usamos authenticate() + consultas raw antes de usar los modelos.
  for (const stmt of statements) {
    if (/^--/.test(stmt) || !stmt) continue;
    try {
      await sequelize.query(stmt);
    } catch (err) {
      // Ignorar errores de "tabla ya existe" o similares durante setup
      if (!err.message.includes('already exists') && !err.message.includes('Unknown database')) {
        throw err;
      }
    }
  }

  console.log('✅ Schema 6FN cargado en intranet_test (MySQL)');

  // Crear establecimiento de prueba y exponerlo globalmente
  const estabId = uuidv4();
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  await sequelize.query(`INSERT INTO establecimiento (id) VALUES ('${estabId}')`);
  await sequelize.query(`INSERT INTO establecimiento_nombre (establecimiento_id, valid_from, nombre) VALUES ('${estabId}', '${now}', 'Establecimiento Test')`);
  await sequelize.query(`INSERT INTO establecimiento_tipo  (establecimiento_id, valid_from, tipo)   VALUES ('${estabId}', '${now}', 'liceo')`);

  global.TEST_ESTAB_ID = estabId;
  console.log(`✅ Establecimiento test: ${estabId}`);
};
