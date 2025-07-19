module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    profesor_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    materia_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    anio_academico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cuatrimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cupo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cursos',
    timestamps: true
  });

  Curso.associate = models => {
    Curso.belongsTo(models.Materia, {
      foreignKey: 'materia_id'
    });
    Curso.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id'
    });
    Curso.hasMany(models.Inscripcion, {
      foreignKey: 'curso_id'
    });
  };

  return Curso;
};
