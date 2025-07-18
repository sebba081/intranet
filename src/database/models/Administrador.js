module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define('Administrador', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, // Según el diseño: un usuario solo puede tener un administrador asociado
      references: {
        model: 'usuarios', // nombre real de la tabla referenciada
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
    }
  }, {
    tableName: 'administrador', // singular según diseño
    timestamps: true
  });

  // Asociación
  Administrador.associate = models => {
    Administrador.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });
  };

  return Administrador;
};
