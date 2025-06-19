const request = require('supertest');
const app = require('../src/app');

describe('Rutas de aulas', () => {
    let aulaId = null;

    it('debería crear una nueva aula', async () => {
        const res = await request(app).post('/api/aulas').send({
            nombre: 'Aula Magna',
            capacidad: 100
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        aulaId = res.body.id;
    });

    it('debería obtener todas las aulas', async () => {
        const res = await request(app).get('/api/aulas');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un aula por ID', async () => {
        const res = await request(app).get(`/api/aulas/${aulaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', aulaId);
    });

    it('debería actualizar un aula', async () => {
        const res = await request(app).put(`/api/aulas/${aulaId}`).send({
            nombre: 'Aula Modificada',
            capacidad: 120
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Aula Modificada');
    });

    it('debería eliminar un aula', async () => {
        const res = await request(app).delete(`/api/aulas/${aulaId}`);
        expect(res.statusCode).toBe(204);
    });
}); 