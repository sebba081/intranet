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
      allowNull: false,
      references: {
        model: 'inscripciones',
        key: 'id'
      }
    },
    nota: {
      type: DataTypes.DECIMAL(4, 2),
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

  Calificacion.associate = function(models) {
    Calificacion.belongsTo(models.Inscripcion, {
      foreignKey: 'inscripcion_id'
    });
  };

  return Calificacion;
};
