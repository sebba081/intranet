const request = require('supertest');
const app = require('../src/app');

describe('Rutas de notas', () => {
    it('debería responder a GET', async () => {
        const res = await request(app).get('/api/notas');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('GET notas');
    });

    it('debería responder a POST', async () => {
        const res = await request(app).post('/api/notas');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('POST notas');
    });

    it('debería responder a PUT', async () => {
        const res = await request(app).put('/api/notas/1');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('PUT nota con ID: 1');
    });

    it('debería responder a DELETE', async () => {
        const res = await request(app).delete('/api/notas/1');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('DELETE nota con ID: 1');
    });
});
