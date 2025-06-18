module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define('Alumno', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    }
    ,
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    carrera: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'alumnos',
    timestamps: true
  });

  // Definir asociación
  Alumno.associate = models => {
    Alumno.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });
  };
  return Alumno;
};