'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Materias (6FN)', () => {
  let materiaId;
  const p = () => ({ nombre: 'Física', codigo: `FIS-${Date.now()}`,
    descripcion: 'Física básica', horas_semanales: 4,
    establecimiento_id: global.TEST_ESTAB_ID });

  it('POST crea materia', async () => {
    const res = await request(app).post('/api/materias').send(p());
    expect(res.statusCode).toBe(201);
    materiaId = res.body.id;
  });
  it('GET lista', async () => {
    const res = await request(app).get('/api/materias');
    expect(res.statusCode).toBe(200);
  });
  it('PUT actualiza nombre', async () => {
    const res = await request(app).put(`/api/materias/${materiaId}`).send({ nombre: 'Física II' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Física II');
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/materias/${materiaId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
