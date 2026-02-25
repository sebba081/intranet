const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de materias', () => {
    let materiaId = null;

    // Máximo 15-20 caracteres
    const codigoBase = `MAT-${Date.now().toString().slice(-5)}`;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    it('debería crear una nueva materia', async () => {
        const res = await request(app).post('/api/materias').send({
            nombre: 'Matemática',
            descripcion: 'Materia de matemáticas básicas',
            codigo: codigoBase
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
        const codigoActualizado = `${codigoBase}U`; // ← más corto que "-UPD"
        const res = await request(app).put(`/api/materias/${materiaId}`).send({
            nombre: 'Matemática Avanzada',
            descripcion: 'Materia de matemáticas avanzadas',
            codigo: codigoActualizado
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Matemática Avanzada');
    });

    it('debería eliminar una materia', async () => {
        const res = await request(app).delete(`/api/materias/${materiaId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/materias/${materiaId}`);
        expect(getRes.statusCode).toBe(404);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
