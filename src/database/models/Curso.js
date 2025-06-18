module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    materia_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Materia',
        key: 'id'
      }
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profesor',
        key: 'id'
      }
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
  };

  return Curso;
};