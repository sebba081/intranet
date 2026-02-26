'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

let tablesConfig = { tables: [] };
try {
  tablesConfig = require(path.join(__dirname, '/../config/tables.json'));
  if (!Array.isArray(tablesConfig.tables)) {
    console.warn("El archivo tables.json no contiene una propiedad 'tables' con un array válido.");
    tablesConfig.tables = [];
  }
} catch (error) {
  console.warn('No se pudo cargar tables.json. Se cargarán todos los modelos.');
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage,
    logging: false
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Leer modelos de forma determinística
const loadedModelNames = new Set();
fs
  .readdirSync(__dirname)
  .sort((a, b) => a.localeCompare(b))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    if (loadedModelNames.has(model.name)) {
      throw new Error(`Modelo duplicado detectado: ${model.name} (${file})`);
    }

    // Si se especificaron tablas, solo registrar las incluidas
    if (tablesConfig.tables.length === 0 || tablesConfig.tables.includes(model.name)) {
      db[model.name] = model;
      loadedModelNames.add(model.name);
    }
  });

// Asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
