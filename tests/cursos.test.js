const request = require('supertest');
const app = require('../src/app');

describe('Rutas de cursos', () => {
    let cursoId = null;
    let profesorId = null;
    let materiaId = null;

    beforeAll(async () => {
        // Crear usuario para el profesor
        const profUserRes = await request(app).post('/api/usuarios').send({
            email: `prof-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });
        expect(profUserRes.statusCode).toBe(201);
        const usuarioId = profUserRes.body.id;

        // Crear profesor
        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: usuarioId,
            nombre: 'Carlos',
            apellido: 'Docente',
            dni: `PROF-${Date.now()}`,
            titulo: 'Ingeniero',
            especialidad: 'Matemáticas'
        });
        expect(profesorRes.statusCode).toBe(201);
        profesorId = profesorRes.body.id;

        // Crear materia
        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Álgebra',
            descripcion: 'Álgebra I',
            codigo: `MAT-${Date.now()}`
        });
        expect(materiaRes.statusCode).toBe(201);
        materiaId = materiaRes.body.id;
    });

    it('debería crear un nuevo curso', async () => {
        const res = await request(app).post('/api/cursos').send({
            profesor_id: profesorId,
            materia_id: materiaId,
            anio_academico: 2024,
            cuatrimestre: 1,
            cupo: 30
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        cursoId = res.body.id;
    });

    it('debería obtener todos los cursos', async () => {
        const res = await request(app).get('/api/cursos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un curso por ID', async () => {
        const res = await request(app).get(`/api/cursos/${cursoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', cursoId);
    });

    it('debería actualizar un curso', async () => {
        const res = await request(app).put(`/api/cursos/${cursoId}`).send({
            profesor_id: profesorId,
            materia_id: materiaId,
            anio_academico: 2024,
            cuatrimestre: 2,
            cupo: 40
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.cupo).toBe(40);
        expect(res.body.cuatrimestre).toBe(2);
    });

    it('debería eliminar un curso', async () => {
        const res = await request(app).delete(`/api/cursos/${cursoId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/cursos/${cursoId}`);
        expect(getRes.statusCode).toBe(404);
    });
});
