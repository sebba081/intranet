'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Carreras (6FN)', () => {
  let carreraId;
  const p = () => ({ nombre: `Ingeniería-${Date.now()}`, tipo: 'ingenieria',
    duracion_semestres: 10, establecimiento_id: global.TEST_ESTAB_ID });

  it('POST crea carrera', async () => {
    const res = await request(app).post('/api/carreras').send(p());
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toContain('Ingeniería');
    carreraId = res.body.id;
  });
  it('GET lista', async () => {
    const res = await request(app).get('/api/carreras');
    expect(res.statusCode).toBe(200);
  });
  it('GET /:id', async () => {
    const res = await request(app).get(`/api/carreras/${carreraId}`);
    expect(res.statusCode).toBe(200);
  });
  it('PUT actualiza nombre', async () => {
    const res = await request(app).put(`/api/carreras/${carreraId}`).send({ nombre: 'Ingeniería Civil' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Ingeniería Civil');
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/carreras/${carreraId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
