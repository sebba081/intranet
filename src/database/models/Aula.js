// modules de aula
module.exports = (sequelize, DataTypes) => {
  const Aula = sequelize.define('Aula', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'aulas',
    timestamps: true
  });

  return Aula;
};