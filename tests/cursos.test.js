const request = require('supertest');
const app = require('../src/app');

describe('Rutas de cursos', () => {
    let cursoId = null;

    // Reemplazar estos IDs por valores válidos o crearlos en un beforeAll
    const profesorId = '11111111-1111-1111-1111-111111111111';
    const materiaId = '33333333-3333-3333-3333-333333333333';

    it('debería crear un nuevo curso', async () => {
        const res = await request(app).post('/api/cursos').send({
            profesor_id: profesorId,
            materia_id: materiaId,
            ano_academico: 2024,
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
