'use strict';

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Cursos (6FN)', () => {
  let cursoId;
  let profesorPersonaId;
  let materiaId;
  let periodoId;

  beforeAll(async () => {
    const estab = global.TEST_ESTAB_ID;

    // Crear periodo
    const pRes = await request(app).post('/api/periodos').send({
      nombre: '2026-1', tipo: 'semestre',
      fecha_inicio: '2026-03-01', fecha_fin: '2026-07-31',
      establecimiento_id: estab
    });
    expect(pRes.statusCode).toBe(201);
    periodoId = pRes.body.id;

    // Crear materia
    const mRes = await request(app).post('/api/materias').send({
      nombre: 'Álgebra Lineal', codigo: `ALG-${Date.now()}`,
      establecimiento_id: estab
    });
    expect(mRes.statusCode).toBe(201);
    materiaId = mRes.body.id;

    // Crear profesor
    const profRes = await request(app).post('/api/profesores').send({
      nombre: 'Docente', apellido: 'Test',
      email: `docente-${Date.now()}@test.cl`, password: 'pass123',
      titulo: 'Ingeniero', especialidad: 'Matemáticas',
      establecimiento_id: estab
    });
    expect(profRes.statusCode).toBe(201);
    profesorPersonaId = profRes.body.id;
  });

  it('POST /api/cursos crea curso', async () => {
    const res = await request(app).post('/api/cursos').send({
      materia_id: materiaId,
      periodo_id: periodoId,
      profesor_persona_id: profesorPersonaId,
      cupo: 35
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.cupo).toBe(35);
    cursoId = res.body.id;
  });

  it('GET /api/cursos lista cursos', async () => {
    const res = await request(app).get('/api/cursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/cursos/:id devuelve el curso', async () => {
    const res = await request(app).get(`/api/cursos/${cursoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(cursoId);
  });

  it('PUT /api/cursos/:id actualiza cupo', async () => {
    const res = await request(app).put(`/api/cursos/${cursoId}`).send({ cupo: 40 });
    expect(res.statusCode).toBe(200);
    expect(res.body.cupo).toBe(40);
  });

  it('DELETE /api/cursos/:id elimina', async () => {
    const res = await request(app).delete(`/api/cursos/${cursoId}`);
    expect(res.statusCode).toBe(204);
  });

  afterAll(() => sequelize.close());
});
