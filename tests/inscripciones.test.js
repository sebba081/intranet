const request = require('supertest');
const app = require('../src/app');

describe('Rutas de inscripciones', () => {
    let inscripcionId = null;
    const alumnoId = '11111111-1111-1111-1111-111111111111';
    const cursoId = '22222222-2222-2222-2222-222222222222';

    it('debería crear una nueva inscripción', async () => {
        const res = await request(app).post('/api/inscripciones').send({
            alumno_id: alumnoId,
            curso_id: cursoId,
            fecha_inscripcion: '2024-01-01'
        });
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
        expect(res.body).toHaveProperty('fecha_inscripcion');
    });

    it('debería eliminar una inscripción', async () => {
        const res = await request(app).delete(`/api/inscripciones/${inscripcionId}`);
        expect(res.statusCode).toBe(204);
    });
});
