'use strict';
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Notas/Calificaciones (6FN)', () => {
  let inscripcionId;
  let evaluacionId;

  beforeAll(async () => {
    const estab = global.TEST_ESTAB_ID;
    const pRes   = await request(app).post('/api/periodos').send({ nombre: `PN-${Date.now()}`, tipo: 'semestre', fecha_inicio: '2026-03-01', fecha_fin: '2026-07-31', establecimiento_id: estab });
    const mRes   = await request(app).post('/api/materias').send({ nombre: 'Literatura', codigo: `LIT-${Date.now()}`, establecimiento_id: estab });
    const profRes = await request(app).post('/api/profesores').send({ nombre: 'P', apellido: 'N', email: `pn-${Date.now()}@t.cl`, password: '123', establecimiento_id: estab });
    const cRes   = await request(app).post('/api/cursos').send({ materia_id: mRes.body.id, periodo_id: pRes.body.id, profesor_persona_id: profRes.body.id, cupo: 30 });
    const aRes   = await request(app).post('/api/alumnos').send({ nombre: 'Alu', apellido: 'N', email: `an-${Date.now()}@t.cl`, password: '123', establecimiento_id: estab });
    const iRes   = await request(app).post('/api/inscripciones').send({ alumno_persona_id: aRes.body.id, curso_id: cRes.body.id });
    inscripcionId = iRes.body.id;

    const eRes   = await request(app).post('/api/evaluaciones').send({ curso_id: cRes.body.id, tipo: 'parcial', descripcion: 'Parcial 1', ponderacion: 0.3, fecha: '2026-05-10' });
    evaluacionId = eRes.body.id;
  });

  it('POST /api/notas registra nota', async () => {
    const res = await request(app).post('/api/notas').send({ inscripcion_id: inscripcionId, evaluacion_id: evaluacionId, nota: 5.5 });
    expect(res.statusCode).toBe(201);
    expect(parseFloat(res.body.nota)).toBe(5.5);
  });
  it('GET lista notas por inscripcion', async () => {
    const res = await request(app).get(`/api/notas?inscripcion_id=${inscripcionId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('PUT actualiza nota', async () => {
    const res = await request(app).put(`/api/notas/${inscripcionId}/${evaluacionId}`).send({ nota: 6.0 });
    expect(res.statusCode).toBe(200);
    expect(parseFloat(res.body.nota)).toBe(6.0);
  });
  it('DELETE elimina nota', async () => {
    const res = await request(app).delete(`/api/notas/${inscripcionId}/${evaluacionId}`);
    expect(res.statusCode).toBe(204);
  });
  afterAll(() => sequelize.close());
});
