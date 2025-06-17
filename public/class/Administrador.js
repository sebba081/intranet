const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Administrador = sequelize.define('administrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },
});

module.exports = Administrador;