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
            references: {
                model: 'Usuario',
                key: 'id'
            }
        },
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
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'profesores',
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