const { Sequelize } = require("sequelize");

const usuarios = Sequelize.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  rol: Sequelize.STRING,
});

