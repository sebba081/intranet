module.exports = (sequelize, DataTypes) => {
  const Calificacion = sequelize.define('Calificacion', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    inscripcion_id: {
      type: DataTypes.UUID,
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