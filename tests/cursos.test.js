const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de cursos', () => {
    let cursoId = null;

    let profesorId;
    let materiaId;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const usuarioProf = await request(app).post('/api/usuarios').send({
            email: `prof-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });
        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: usuarioProf.body.id,
            nombre: 'Ana',
            apellido: 'López',
            dni: `PROF-${Date.now()}`,
            titulo: 'PhD',
            especialidad: 'Test'
        });
        profesorId = profesorRes.body.id;

        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Historia',
            descripcion: 'Historia básica',
            codigo: `MAT-${Date.now()}`
        });
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

    afterAll(async () => {
        await sequelize.close();
    });
});
