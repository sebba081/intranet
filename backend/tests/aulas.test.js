'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Aulas (6FN)', () => {
  let aulaId;
  const p = () => ({ nombre: `Sala-${Date.now()}`, ubicacion: 'Bloque A',
    capacidad: 40, establecimiento_id: global.TEST_ESTAB_ID });

  it('POST crea aula', async () => {
    const res = await request(app).post('/api/aulas').send(p());
    expect(res.statusCode).toBe(201);
    aulaId = res.body.id;
  });
  it('GET lista', async () => {
    const res = await request(app).get('/api/aulas');
    expect(res.statusCode).toBe(200);
  });
  it('PUT actualiza capacidad', async () => {
    const res = await request(app).put(`/api/aulas/${aulaId}`).send({ capacidad: 50 });
    expect(res.statusCode).toBe(200);
    expect(res.body.capacidad).toBe(50);
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/aulas/${aulaId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
