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
      unique: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    carrera: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'alumnos',
    timestamps: true
  });

  Alumno.associate = models => {
    Alumno.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });
  };

  return Alumno;
};
