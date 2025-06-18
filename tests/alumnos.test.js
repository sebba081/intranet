const request = require('supertest');
const app = require('../src/app');

describe('Rutas de alumnos', () => {
    let alumnoId = null;
    let usuarioId = null;

    beforeAll(async () => {
        const usuarioRes = await request(app).post('/api/usuarios').send({
            email: `alumno-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'alumno'
        });
        console.log('Respuesta de creación de usuario:', usuarioRes.body);
        expect(usuarioRes.statusCode).toBe(201);
        usuarioId = usuarioRes.body.id;
        expect(usuarioId).toBeDefined();
    });

    it('debería crear un nuevo alumno', async () => {
        const res = await request(app).post('/api/alumnos').send({
            usuario_id: usuarioId,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: `DNI${Date.now()}`,
            fecha_nacimiento: '2000-01-01',
            telefono: '123456789',
            direccion: 'Calle Falsa 123',
            carrera: 'Ingeniería Informática'
        });

        console.log('CREAR alumno:', res.statusCode, res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');

        alumnoId = res.body.id;
        console.log('ID asignado:', alumnoId);
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
            telefono: '987654321',
            direccion: 'Nueva dirección'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Juan Modificado');
    });

    it('debería eliminar un alumno', async () => {
        const res = await request(app).delete(`/api/alumnos/${alumnoId}`);
        expect(res.statusCode).toBe(204);
    });
});
