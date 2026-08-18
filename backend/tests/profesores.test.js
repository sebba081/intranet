'use strict';

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Profesores (6FN)', () => {
  let personaId;

  const payload = () => ({
    nombre: 'Carlos',
    apellido: 'Vega',
    dni: `DNI-PR-${Date.now()}`,
    email: `prof-${Date.now()}@test.cl`,
    password: 'pass123',
    titulo: 'Licenciado en Matemáticas',
    especialidad: 'Álgebra',
    establecimiento_id: global.TEST_ESTAB_ID
  });

  it('POST /api/profesores crea profesor', async () => {
    const res = await request(app).post('/api/profesores').send(payload());
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Licenciado en Matemáticas');
    personaId = res.body.id;
  });

  it('GET /api/profesores lista profesores', async () => {
    const res = await request(app).get('/api/profesores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/profesores/:id actualiza especialidad', async () => {
    const res = await request(app).put(`/api/profesores/${personaId}`).send({ especialidad: 'Cálculo' });
    expect(res.statusCode).toBe(200);
    expect(res.body.especialidad).toBe('Cálculo');
  });

  it('DELETE /api/profesores/:id elimina', async () => {
    const res = await request(app).delete(`/api/profesores/${personaId}`);
    expect(res.statusCode).toBe(204);
  });

  afterAll(() => sequelize.close());
});
