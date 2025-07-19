const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de alumnos', () => {
    let alumnoId = null;
    let usuarioId = null;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        const usuarioRes = await request(app).post('/api/usuarios').send({
            email: `alumno-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'alumno'
        });
        expect(usuarioRes.statusCode).toBe(201);
        usuarioId = usuarioRes.body.id;
        expect(usuarioId).toBeDefined();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('debería crear un nuevo alumno', async () => {
        const res = await request(app).post('/api/alumnos').send({
            usuario_id: usuarioId,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: `DNI${Date.now()}`,
            fecha_nacimiento: '2000-01-01',
            carrera: 'Ingeniería Informática'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        alumnoId = res.body.id;
    });

    it('debería obtener todos los alumnos', async () => {
        const res = await request(app).get('/api/alumnos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un alumno por ID', async () => {
        const res = await request(app).get(`/api/alumnos/${alumnoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', alumnoId);
    });

    it('debería actualizar un alumno', async () => {
        const res = await request(app).put(`/api/alumnos/${alumnoId}`).send({
            nombre: 'Juan Modificado',
            apellido: 'Pérez',
            dni: `DNI${Date.now()}`,
            fecha_nacimiento: '2000-01-01',
            carrera: 'Ingeniería Industrial'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Juan Modificado');
        expect(res.body.carrera).toBe('Ingeniería Industrial');
    });

    it('debería eliminar un alumno', async () => {
        const res = await request(app).delete(`/api/alumnos/${alumnoId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/alumnos/${alumnoId}`);
        expect(getRes.statusCode).toBe(404);
    });
});