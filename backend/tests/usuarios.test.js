'use strict';

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('POST /api/usuarios — crear usuario completo (6FN)', () => {
  let usuarioId = null;
  let personaId = null;

  const payload = () => ({
    nombre: 'Ana',
    apellido: 'Torres',
    dni: `DNI-${Date.now()}`,
    fecha_nacimiento: '1995-06-15',
    email: `ana-${Date.now()}@test.cl`,
    password: 'clave123',
    rol: 'alumno',
    establecimiento_id: global.TEST_ESTAB_ID
  });

  it('crea un usuario y devuelve 201 con campos completos', async () => {
    const res = await request(app).post('/api/usuarios').send(payload());
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('usuario_id');
    expect(res.body).toHaveProperty('persona_id');
    expect(res.body.nombre).toBe('Ana');
    expect(res.body.email).toBeDefined();
    expect(res.body.rol).toBe('alumno');
    usuarioId = res.body.usuario_id;
    personaId = res.body.persona_id;
  });

  it('GET /api/usuarios devuelve lista', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/usuarios/:id devuelve el usuario creado', async () => {
    const res = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.usuario_id).toBe(usuarioId);
  });

  it('PUT /api/usuarios/:id actualiza nombre', async () => {
    const res = await request(app).put(`/api/usuarios/${usuarioId}`).send({ nombre: 'Ana Editada' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Ana Editada');
  });

  it('GET /api/usuarios/:id devuelve 404 para ID inexistente', async () => {
    const res = await request(app).get('/api/usuarios/00000000-0000-0000-0000-000000000000');
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/usuarios/:id elimina usuario', async () => {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
