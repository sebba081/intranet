module.exports = (sequelize, DataTypes) => {
  const Alumno = sequelize.define('Alumno', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      unique: true,
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
    },
    dni: {
      type: DataTypes.STRING,
      unique: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATE
    },
    carrera: {
      type: DataTypes.STRING
    }}, {
    tableName: 'alumnos', // Nombre fijo en singular
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