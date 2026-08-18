'use strict';

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Alumnos (6FN)', () => {
  let personaId;

  const payload = () => ({
    nombre: 'Luis',
    apellido: 'Pérez',
    dni: `DNI-AL-${Date.now()}`,
    fecha_nacimiento: '2001-03-20',
    email: `luis-${Date.now()}@test.cl`,
    password: 'pass123',
    establecimiento_id: global.TEST_ESTAB_ID
  });

  it('POST /api/alumnos crea alumno con rol=alumno', async () => {
    const res = await request(app).post('/api/alumnos').send(payload());
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Luis');
    personaId = res.body.id;
  });

  it('GET /api/alumnos lista alumnos', async () => {
    const res = await request(app).get('/api/alumnos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/alumnos/:id devuelve el alumno creado', async () => {
    const res = await request(app).get(`/api/alumnos/${personaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(personaId);
  });

  it('PUT /api/alumnos/:id actualiza nombre', async () => {
    const res = await request(app).put(`/api/alumnos/${personaId}`).send({ nombre: 'Luis Editado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Luis Editado');
  });

  it('DELETE /api/alumnos/:id elimina', async () => {
    const res = await request(app).delete(`/api/alumnos/${personaId}`);
    expect(res.statusCode).toBe(204);
    const get = await request(app).get(`/api/alumnos/${personaId}`);
    expect(get.statusCode).toBe(404);
  });

  afterAll(() => sequelize.close());
});
