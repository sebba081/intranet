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
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING
    },
    apellido: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'administrador', // Nombre fijo en singular
    timestamps: true
  });

  // Definir asociación
  Administrador.associate = models => {
    Administrador.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id'
    });
  };

  return Administrador;
};