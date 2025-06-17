module.exports = (sequelize, DataTypes) => {
    const Profesor = sequelize.define('Profesor', {
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
        titulo: {
            type: DataTypes.STRING
        },
        especialidad: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'profesor', // Nombre fijo en singular
        timestamps: true
    });
  
    // Definir asociación
    Profesor.associate = models => {
        Profesor.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id'
        });
    };
    
    return Profesor;
};