module.exports = (sequelize, DataTypes) => {
  const Calificacion = sequelize.define('Calificacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    inscripcion_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'calificaciones',
    timestamps: true
  });

  // Aquí puedes definir las asociaciones si es necesario
  Calificacion.associate = function(models) {
    // Asociaciones
  };

  return Calificacion;
};