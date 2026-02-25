module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesor', {
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
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'profesores',
    timestamps: true
  });

  Profesor.associate = models => {
    Profesor.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });
  };

  return Profesor;
};
