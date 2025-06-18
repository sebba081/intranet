module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('Horario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    curso_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Curso',
        key: 'id'
      }
    },
    aula_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Aula',
        key: 'id'
      }
    },
    dia: {
      type: DataTypes.STRING,
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