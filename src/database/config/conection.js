const { Sequelize } = require('sequelize');
const dbConfig = require('./config.json')[process.env.NODE_ENV || 'development'];

let sequelize;

if (dbConfig.dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbConfig.storage,
    logging: false
  });
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: console.log, // Esto habilita el registro de consultas
  });
}

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;