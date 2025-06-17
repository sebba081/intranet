const {DataTypes} = require('sequelize');
const sequelize = require('./db');

// Definir las tablas y sus relaciones
const Carrera = sequelize.define('carrera', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  duracion: DataTypes.INTEGER
});

