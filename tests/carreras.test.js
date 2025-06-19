const request = require('supertest');
const app = require('../src/app');

describe('Rutas de carreras', () => {
    it('debería responder a GET', async () => {
        const res = await request(app).get('/api/carreras');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('GET carreras');
    });

    it('debería responder a POST', async () => {
        const res = await request(app).post('/api/carreras');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('POST carreras');
    });

    it('debería responder a PUT', async () => {
        const res = await request(app).put('/api/carreras/1');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('PUT carreras con ID: 1');
    });

    it('debería responder a DELETE', async () => {
        const res = await request(app).delete('/api/carreras/1');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('DELETE carreras con ID: 1');
    });
});
