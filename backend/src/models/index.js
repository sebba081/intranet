'use strict';

/**
 * Loader de modelos Sequelize 6FN.
 *
 * En 6FN tenemos ~50 tablas. En lugar de un archivo por modelo, las
 * definiciones están consolidadas en `definitions.js`. Aquí sólo se
 * instancian sobre la conexión de `config/db.js` y se registran las
 * asociaciones.
 */

const { sequelize, Sequelize } = require('../config/db');
const { factories, defineAssociations } = require('./definitions');

const db = {};

for (const [name, factory] of Object.entries(factories)) {
  db[name] = factory(sequelize, Sequelize.DataTypes);
}

defineAssociations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
