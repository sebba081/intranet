module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'carreras',
    timestamps: true
  });

  return Carrera;
};
