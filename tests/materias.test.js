const request = require('supertest');
const app = require('../src/app');

describe('Rutas de materias', () => {
    let materiaId = null;

    it('debería crear una nueva materia', async () => {
        const res = await request(app).post('/api/materias').send({
            nombre: 'Matemática',
            descripcion: 'Materia de matemáticas básicas'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        materiaId = res.body.id;
    });

    it('debería obtener todas las materias', async () => {
        const res = await request(app).get('/api/materias');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener una materia por ID', async () => {
        const res = await request(app).get(`/api/materias/${materiaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', materiaId);
    });

    it('debería actualizar una materia', async () => {
        const res = await request(app).put(`/api/materias/${materiaId}`).send({
            nombre: 'Matemática Avanzada',
            descripcion: 'Materia de matemáticas avanzadas'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Matemática Avanzada');
    });

    it('debería eliminar una materia', async () => {
        const res = await request(app).delete(`/api/materias/${materiaId}`);
        expect(res.statusCode).toBe(204);
    });
}); 