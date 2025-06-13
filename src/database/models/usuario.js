module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('alumno', 'profesor', 'administrador'),
      allowNull: false
    }
  }, {
    tableName: 'usuarios', // Nombre fijo en singular
    timestamps: true
    
  });

  return Usuario;
};