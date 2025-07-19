const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de notas (calificaciones)', () => {
    let notaId = null;
    let inscripcionId = null;
    let alumnoId = null;
    let cursoId = null;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        // Crear usuario y alumno
        const userRes = await request(app).post('/api/usuarios').send({
            email: `alumno-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'alumno'
        });
        const usuarioId = userRes.body.id;

        const alumnoRes = await request(app).post('/api/alumnos').send({
            usuario_id: usuarioId,
            nombre: 'Juan',
            apellido: 'Tester',
            dni: `DNI-${Date.now()}`,
            fecha_nacimiento: '2000-01-01',
            telefono: '123456789',
            direccion: 'Calle Test 123',
            carrera: 'Ingeniería'
        });
        alumnoId = alumnoRes.body.id;

        // Crear materia
        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Matemática',
            descripcion: 'Cálculo I',
            codigo: `MAT-${Date.now()}`
        });
        expect(materiaRes.statusCode).toBe(201);
        const materiaId = materiaRes.body.id;

        // Crear profesor
        const profUserRes = await request(app).post('/api/usuarios').send({
            email: `prof-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });
        const profUsuarioId = profUserRes.body.id;

        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: profUsuarioId,
            nombre: 'Ana',
            apellido: 'Profesora',
            dni: `PROF-${Date.now()}`,
            titulo: 'Magíster',
            especialidad: 'Álgebra'
        });
        expect(profesorRes.statusCode).toBe(201);
        const profesorId = profesorRes.body.id;

        // Crear curso
        const cursoRes = await request(app).post('/api/cursos').send({
            profesor_id: profesorId,
            materia_id: materiaId,
            anio_academico: 2024,
            cuatrimestre: 1,
            cupo: 40
        });
        console.log('cursoRes', cursoRes.statusCode, cursoRes.body);
        expect(cursoRes.statusCode).toBe(201);
        cursoId = cursoRes.body.id;

        // Crear inscripción válida
        const inscripcionRes = await request(app).post('/api/inscripciones').send({
            alumno_id: alumnoId,
            curso_id: cursoId,
            fecha_inscripcion: '2024-01-01'
        });
        expect(inscripcionRes.statusCode).toBe(201);
        inscripcionId = inscripcionRes.body.id;
    });

    it('debería crear una nueva calificación', async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // 👈 espera corta

        const res = await request(app).post('/api/notas').send({
            inscripcion_id: inscripcionId,
            nota: 8.5,
            fecha: '2024-01-15'
        });

        console.log('📋 Respuesta creación nota:', res.statusCode, res.body); // 👈 debug útil

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        notaId = res.body.id;
    });

    it('debería obtener todas las calificaciones', async () => {
        const res = await request(app).get('/api/notas');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener una calificación por ID', async () => {
        const res = await request(app).get(`/api/notas/${notaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', notaId);
    });

    it('debería actualizar una calificación', async () => {
        const res = await request(app).put(`/api/notas/${notaId}`).send({
            inscripcion_id: inscripcionId,
            nota: 9.25,
            fecha: '2024-02-01'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nota).toBe(9.25);
    });

    it('debería eliminar una calificación', async () => {
        const res = await request(app).delete(`/api/notas/${notaId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/notas/${notaId}`);
        expect(getRes.statusCode).toBe(404);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
