// setup.js
const { v4: uuidv4 } = require('uuid');
const { sequelize, Usuario, Profesor, Alumno, Materia, Curso } = require('../src/database/models');

module.exports = async () => {
    try {
        await sequelize.sync({ force: true });

        const usuarioAlumno = await Usuario.create({
            id: uuidv4(),
            email: 'alumno@test.com',
            password: '1234',
            rol: 'alumno'
        });

        await Alumno.create({
            id: uuidv4(),
            usuario_id: usuarioAlumno.id,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: 'DNI001',
            fecha_nacimiento: new Date('2000-01-01'),
            carrera: 'Ingeniería Informática'
        });

        const usuarioProfesor = await Usuario.create({
            id: uuidv4(),
            email: 'profesor@test.com',
            password: '1234',
            rol: 'profesor'
        });

        const profesor = await Profesor.create({
            id: uuidv4(),
            usuario_id: usuarioProfesor.id,
            nombre: 'Carlos',
            apellido: 'Gómez',
            dni: 'DNI002',
            titulo: 'Licenciado en Matemáticas',
            especialidad: 'Álgebra'
        });

        const materia = await Materia.create({
            id: uuidv4(),
            nombre: 'Álgebra I',
            descripcion: 'Matemáticas básicas',
            codigo: 'MAT101'
        });

        await Curso.create({
            id: uuidv4(),
            profesor_id: profesor.id,
            materia_id: materia.id,
            anio_academico: 2025,
            cuatrimestre: 1,
            cupo: 30
        });

        console.log('✅ Setup completo.');
    } catch (err) {
        console.error('❌ Error en setup:', err);
    }
};
