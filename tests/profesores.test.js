const request = require('supertest');
const app = require('../src/app');
let profesorId;

describe('Rutas de profesores', () => {
    let usuarioId;

    beforeAll(async () => {
        // Crear usuario con rol "profesor"
        const usuarioRes = await request(app).post('/api/usuarios').send({
            email: `profesor-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });

        expect(usuarioRes.statusCode).toBe(201);
        usuarioId = usuarioRes.body.id;
    });

    it('debería crear un nuevo profesor', async () => {
        const res = await request(app).post('/api/profesores').send({
            usuario_id: usuarioId,
            nombre: 'Carlos',
            apellido: 'Gómez',
            dni: `DNI${Date.now()}`,
            titulo: 'Doctorado en Matemáticas',
            especialidad: 'Álgebra'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        profesorId = res.body.id;
    });

    it('debería obtener todos los profesores', async () => {
        const res = await request(app).get('/api/profesores');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un profesor por ID', async () => {
        const res = await request(app).get(`/api/profesores/${profesorId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', profesorId);
    });

    it('debería actualizar un profesor', async () => {
        const res = await request(app).put(`/api/profesores/${profesorId}`).send({
            nombre: 'Carlos Modificado',
            especialidad: 'Geometría'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Carlos Modificado');
    });

    it('debería eliminar un profesor', async () => {
        const res = await request(app).delete(`/api/profesores/${profesorId}`);
        expect(res.statusCode).toBe(204);
    });

});
