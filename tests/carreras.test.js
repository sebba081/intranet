const request = require('supertest');
const app = require('../src/app');

describe('Rutas de carreras', () => {
    let carreraId = null;

    it('debería crear una nueva carrera', async () => {
        const res = await request(app).post('/api/carreras').send({
            nombre: 'Ingeniería Civil'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        carreraId = res.body.id;
    });

    it('debería obtener todas las carreras', async () => {
        const res = await request(app).get('/api/carreras');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener una carrera por ID', async () => {
        const res = await request(app).get(`/api/carreras/${carreraId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', carreraId);
    });

    it('debería actualizar una carrera', async () => {
        const res = await request(app).put(`/api/carreras/${carreraId}`).send({
            nombre: 'Ingeniería Industrial'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Ingeniería Industrial');
    });

    it('debería eliminar una carrera', async () => {
        const res = await request(app).delete(`/api/carreras/${carreraId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/carreras/${carreraId}`);
        expect(getRes.statusCode).toBe(404);
    });
});
