const request = require('supertest');
const app = require('../src/app');

describe('Rutas de administradores', () => {
    let adminId = null;
    let usuarioId = null;

    beforeAll(async () => {
        // Crear usuario con rol "admin"
        const usuarioRes = await request(app).post('/api/usuarios').send({
            email: `admin-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'administrador'
        });
        expect(usuarioRes.statusCode).toBe(201);
        usuarioId = usuarioRes.body.id;
        expect(usuarioId).toBeDefined();
    });

    it('debería crear un nuevo administrador', async () => {
        const res = await request(app).post('/api/administradores').send({
            usuario_id: usuarioId,
            nombre: 'Admin',
            apellido: 'Principal'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        adminId = res.body.id;
    });

    it('debería obtener todos los administradores', async () => {
        const res = await request(app).get('/api/administradores');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debería obtener un administrador por ID', async () => {
        const res = await request(app).get(`/api/administradores/${adminId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', adminId);
    });

    it('debería actualizar un administrador', async () => {
        const res = await request(app).put(`/api/administradores/${adminId}`).send({
            nombre: 'Admin Modificado',
            apellido: 'Principal'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Admin Modificado');
    });

    it('debería eliminar un administrador', async () => {
        const res = await request(app).delete(`/api/administradores/${adminId}`);
        expect(res.statusCode).toBe(204);
    });
});