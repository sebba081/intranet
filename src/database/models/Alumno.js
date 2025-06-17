const {DataTypes} = require('sequelize');
const sequelize = require('./db');

// Definir la estructura de la tabla alumnos

const Alumno = sequelize.define('alumnos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id',
    },
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  carrera: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Alumno;