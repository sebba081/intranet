'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Migración inicial 6FN.
 *
 * Lee `src/database/schema.sql` y ejecuta cada statement en orden.
 * El schema crea ~50 tablas + 15 vistas y termina con el seed de roles.
 *
 * Para revertir, hace DROP DATABASE intranet (irreversible para datos).
 */
module.exports = {
  up: async (queryInterface) => {
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    // sequelize.query no acepta múltiples statements en un solo call;
    // partimos por ';' respetando bloques (no hay procedimientos almacenados).
    const statements = sql
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'));

    for (const stmt of statements) {
      // Ignoramos los comentarios sueltos
      if (/^--/.test(stmt) || stmt.length === 0) continue;
      await queryInterface.sequelize.query(stmt);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DROP DATABASE IF EXISTS intranet');
  }
};
