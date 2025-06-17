const mysql = require('mysql2');

// Importar datos de configuración desde un archivo JSON
const dbConfig = require('./config.json');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida con éxito.');
});

module.exports = connection;