const request = require('supertest');
const app = require('../src/app');

describe('Rutas de horarios', () => {
    let horarioId = null;
    const usuarioId = '11111111-1111-1111-1111-111111111111';
    const aulaId = '22222222-2222-2222-2222-222222222222';

    it('debería crear un nuevo horario', async () => {
        const res = await request(app).post('/api/horarios').send({
            usuario_id: usuarioId,
            aula_id: aulaId,
            dia: 'Lunes',
            hora_inicio: '08:00',
            hora_fin: '10:00'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        horarioId = res.body.id;
    });

    it('debería obtener todos los horarios', async () => {
        const res = await request(app).get('/api/horarios');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un horario por ID', async () => {
        const res = await request(app).get(`/api/horarios/${horarioId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', horarioId);
    });

    it('debería actualizar un horario', async () => {
        const res = await request(app).put(`/api/horarios/${horarioId}`).send({
            dia: 'Martes',
            hora_inicio: '10:00',
            hora_fin: '12:00',
            usuario_id: usuarioId,
            aula_id: aulaId
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.dia).toBe('Martes');
    });

    it('debería eliminar un horario', async () => {
        const res = await request(app).delete(`/api/horarios/${horarioId}`);
        expect(res.statusCode).toBe(204);
    });
}); 