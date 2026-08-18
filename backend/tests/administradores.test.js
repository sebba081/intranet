'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Administradores (6FN)', () => {
  let personaId;
  const p = () => ({ nombre: 'Admin', apellido: 'Test', dni: `DNI-AD-${Date.now()}`,
    email: `adm-${Date.now()}@test.cl`, password: 'pass', establecimiento_id: global.TEST_ESTAB_ID });

  it('POST crea administrador', async () => {
    const res = await request(app).post('/api/administradores').send(p());
    expect(res.statusCode).toBe(201);
    personaId = res.body.id;
  });
  it('GET lista', async () => {
    const res = await request(app).get('/api/administradores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('PUT actualiza nombre', async () => {
    const res = await request(app).put(`/api/administradores/${personaId}`).send({ nombre: 'Admin2' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Admin2');
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/administradores/${personaId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
