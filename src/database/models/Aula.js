// modules de aula
module.exports = (sequelize, DataTypes) => {
  const Aula = sequelize.define('Aula', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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