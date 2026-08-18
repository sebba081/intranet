'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Horarios (6FN)', () => {
  let horarioId;
  let cursoId;
  let aulaId;

  beforeAll(async () => {
    const estab = global.TEST_ESTAB_ID;

    const pRes = await request(app).post('/api/periodos').send({
      nombre: `P-${Date.now()}`, tipo: 'semestre',
      fecha_inicio: '2026-03-01', fecha_fin: '2026-07-31',
      establecimiento_id: estab
    });
    const mRes = await request(app).post('/api/materias').send({
      nombre: 'Química', codigo: `QUI-${Date.now()}`, establecimiento_id: estab
    });
    const profRes = await request(app).post('/api/profesores').send({
      nombre: 'Prof', apellido: 'H', email: `ph-${Date.now()}@t.cl`,
      password: '123', establecimiento_id: estab
    });
    const cRes = await request(app).post('/api/cursos').send({
      materia_id: mRes.body.id, periodo_id: pRes.body.id,
      profesor_persona_id: profRes.body.id, cupo: 30
    });
    cursoId = cRes.body.id;

    const aRes = await request(app).post('/api/aulas').send({
      nombre: 'Lab1', ubicacion: 'Piso2', capacidad: 25, establecimiento_id: estab
    });
    aulaId = aRes.body.id;
  });

  it('POST crea horario', async () => {
    const res = await request(app).post('/api/horarios').send({
      curso_id: cursoId, aula_id: aulaId,
      dia: 'Lunes', hora_inicio: '08:00:00', hora_fin: '10:00:00'
    });
    expect(res.statusCode).toBe(201);
    horarioId = res.body.id;
  });
  it('GET lista', async () => {
    const res = await request(app).get(`/api/horarios?curso_id=${cursoId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/horarios/${horarioId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
