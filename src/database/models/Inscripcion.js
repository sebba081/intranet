module.exports = (sequelize, DataTypes) => {
  const Inscripcion = sequelize.define('Inscripcion', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    alumno_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Alumno',
        key: 'id'
      }
    },
    curso_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Curso',
        key: 'id'
      }
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'inscripciones',
    timestamps: true
  });

  Inscripcion.associate = models => {
    Inscripcion.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id'
    });
    Inscripcion.belongsTo(models.Curso, {
      foreignKey: 'curso_id'
    });
  };

  return Inscripcion;
};