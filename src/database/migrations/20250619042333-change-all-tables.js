'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      rol: {
        type: Sequelize.ENUM('alumno', 'profesor', 'administrador'),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('alumnos', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
      },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      apellido: { type: Sequelize.STRING(100), allowNull: false },
      dni: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      fecha_nacimiento: { type: Sequelize.DATE, allowNull: false },
      carrera: { type: Sequelize.STRING(100), allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('profesores', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      usuario_id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
      },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      apellido: { type: Sequelize.STRING(100), allowNull: false },
      dni: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      titulo: { type: Sequelize.STRING(100), allowNull: false },
      especialidad: { type: Sequelize.STRING(100), allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('administrador', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      usuario_id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
      },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      apellido: { type: Sequelize.STRING(100), allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('materias', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      descripcion: { type: Sequelize.TEXT },
      codigo: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('cursos', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      profesor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'profesores', key: 'id' }
      },
      materia_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'materias', key: 'id' }
      },
      ano_academico: { type: Sequelize.INTEGER, allowNull: false },
      cuatrimestre: { type: Sequelize.INTEGER, allowNull: false },
      cupo: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('aulas', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      nombre: { type: Sequelize.STRING(50), allowNull: false },
      ubicacion: { type: Sequelize.STRING(100), allowNull: false },
      capacidad: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('horarios', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      curso_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'cursos', key: 'id' }
      },
      aula_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'aulas', key: 'id' }
      },
      dia: {
        type: Sequelize.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'),
        allowNull: false
      },
      hora_inicio: { type: Sequelize.TIME, allowNull: false },
      hora_fin: { type: Sequelize.TIME, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('inscripciones', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      alumno_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'alumnos', key: 'id' }
      },
      curso_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'cursos', key: 'id' }
      },
      fecha_inscripcion: { type: Sequelize.DATE, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      indexes: [
        {
          unique: true,
          fields: ['alumno_id', 'curso_id']
        }
      ]
    });

    await queryInterface.createTable('calificaciones', {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      inscripcion_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'inscripciones', key: 'id' }
      },
      nota: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      fecha: { type: Sequelize.DATE, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('calificaciones');
    await queryInterface.dropTable('inscripciones');
    await queryInterface.dropTable('horarios');
    await queryInterface.dropTable('aulas');
    await queryInterface.dropTable('cursos');
    await queryInterface.dropTable('materias');
    await queryInterface.dropTable('administrador');
    await queryInterface.dropTable('profesores');
    await queryInterface.dropTable('alumnos');
    await queryInterface.dropTable('usuarios');
  }
};
