const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de inscripciones', () => {
    let inscripcionId = null;
    let alumnoId = null;
    let cursoId = null;

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Limpia la base de datos

        // Crear usuario y alumno
        const userRes = await request(app).post('/api/usuarios').send({
            email: `alumno-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'alumno'
        });
        expect(userRes.statusCode).toBe(201);
        const usuarioId = userRes.body.id;

        const alumnoRes = await request(app).post('/api/alumnos').send({
            usuario_id: usuarioId,
            nombre: 'Luis',
            apellido: 'González',
            dni: `DNI-${Date.now()}`,
            fecha_nacimiento: '2001-01-01',
            telefono: '987654321',
            direccion: 'Calle Inscripción',
            carrera: 'Ingeniería Civil'
        });
        expect(alumnoRes.statusCode).toBe(201);
        alumnoId = alumnoRes.body.id;

        // Crear materia
        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Física',
            descripcion: 'Física general',
            codigo: `FIS-${Date.now()}`
        });
        expect(materiaRes.statusCode).toBe(201);
        const materiaId = materiaRes.body.id;

        // Crear usuario y profesor
        const profUserRes = await request(app).post('/api/usuarios').send({
            email: `prof-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });
        expect(profUserRes.statusCode).toBe(201);
        const profUsuarioId = profUserRes.body.id;

        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: profUsuarioId,
            nombre: 'María',
            apellido: 'Pérez',
            dni: `PROF-${Date.now()}`,
            titulo: 'PhD',
            especialidad: 'Mecánica'
        });
        expect(profesorRes.statusCode).toBe(201);
        const profesorId = profesorRes.body.id;

        // Crear curso
        const cursoRes = await request(app).post('/api/cursos').send({
            profesor_id: profesorId,
            materia_id: materiaId,
            anio_academico: 2024,
            cuatrimestre: 1,
            cupo: 35
        });
        if (cursoRes.statusCode !== 201) console.error('❌ Error al crear curso:', cursoRes.body);
        expect(cursoRes.statusCode).toBe(201);
        cursoId = cursoRes.body.id;
    });

    it('debería crear una nueva inscripción', async () => {
        const res = await request(app).post('/api/inscripciones').send({
            alumno_id: alumnoId,
            curso_id: cursoId,
            fecha_inscripcion: '2024-01-01'
        });
        if (res.statusCode !== 201) console.error('❌ Error al crear inscripción:', res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        inscripcionId = res.body.id;
    });

    it('debería obtener todas las inscripciones', async () => {
        const res = await request(app).get('/api/inscripciones');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener una inscripción por ID', async () => {
        const res = await request(app).get(`/api/inscripciones/${inscripcionId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', inscripcionId);
    });

    it('debería actualizar una inscripción', async () => {
        const res = await request(app).put(`/api/inscripciones/${inscripcionId}`).send({
            alumno_id: alumnoId,
            curso_id: cursoId,
            fecha_inscripcion: '2024-02-01'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.fecha_inscripcion.startsWith('2024-02-01')).toBe(true);
    });

    it('debería eliminar una inscripción', async () => {
        const res = await request(app).delete(`/api/inscripciones/${inscripcionId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/inscripciones/${inscripcionId}`);
        expect(getRes.statusCode).toBe(404);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
