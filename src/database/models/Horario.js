module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('Horario', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    curso_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id'
      }
    },
    aula_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'aulas',
        key: 'id'
      }
    },
    dia: {
      type: DataTypes.ENUM("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"),
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'horarios',
    timestamps: true
  });

  Horario.associate = models => {
    Horario.belongsTo(models.Curso, {
      foreignKey: 'curso_id'
    });
    Horario.belongsTo(models.Aula, {
      foreignKey: 'aula_id'
    });
  };

  return Horario;
};
