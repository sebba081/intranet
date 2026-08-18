'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Inscripciones (6FN)', () => {
  let inscripcionId;
  let alumnoPersonaId;
  let cursoId;

  beforeAll(async () => {
    const estab = global.TEST_ESTAB_ID;
    const pRes  = await request(app).post('/api/periodos').send({ nombre: `PI-${Date.now()}`, tipo: 'semestre', fecha_inicio: '2026-03-01', fecha_fin: '2026-07-31', establecimiento_id: estab });
    const mRes  = await request(app).post('/api/materias').send({ nombre: 'Historia', codigo: `HIS-${Date.now()}`, establecimiento_id: estab });
    const profRes = await request(app).post('/api/profesores').send({ nombre: 'P', apellido: 'I', email: `pi-${Date.now()}@t.cl`, password: '123', establecimiento_id: estab });
    const cRes  = await request(app).post('/api/cursos').send({ materia_id: mRes.body.id, periodo_id: pRes.body.id, profesor_persona_id: profRes.body.id, cupo: 30 });
    cursoId = cRes.body.id;

    const aRes  = await request(app).post('/api/alumnos').send({ nombre: 'Alumno', apellido: 'I', email: `ai-${Date.now()}@t.cl`, password: '123', establecimiento_id: estab });
    alumnoPersonaId = aRes.body.id;
  });

  it('POST crea inscripción', async () => {
    const res = await request(app).post('/api/inscripciones').send({ alumno_persona_id: alumnoPersonaId, curso_id: cursoId });
    expect(res.statusCode).toBe(201);
    inscripcionId = res.body.id;
  });
  it('GET lista por curso', async () => {
    const res = await request(app).get(`/api/inscripciones?curso_id=${cursoId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('DELETE elimina', async () => {
    const res = await request(app).delete(`/api/inscripciones/${inscripcionId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
