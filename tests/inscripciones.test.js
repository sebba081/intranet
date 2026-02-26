const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');
const { v4: uuidv4 } = require('uuid');

describe('Rutas de inscripciones', () => {
  let inscripcionId = null;
  let alumnoId = null;
  let cursoId = null;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const userAlumno = await request(app).post('/api/usuarios').send({
      email: `alumno-${uuidv4()}@mail.com`,
      password: '123456',
      rol: 'alumno'
    });
    expect(userAlumno.statusCode).toBe(201);

    const alumnoRes = await request(app).post('/api/alumnos').send({
      usuario_id: userAlumno.body.id,
      nombre: 'Carlos',
      apellido: 'Tester',
      dni: `DNI-${Date.now()}`,
      fecha_nacimiento: '2001-01-01',
      carrera: 'Informática'
    });
    expect(alumnoRes.statusCode).toBe(201);
    alumnoId = alumnoRes.body.id;

    const usuarioProfesor = await request(app).post('/api/usuarios').send({
      email: `prof-${uuidv4()}@mail.com`,
      password: '12345678',
      rol: 'profesor'
    });
    expect(usuarioProfesor.statusCode).toBe(201);

    const profesor = await request(app).post('/api/profesores').send({
      usuario_id: usuarioProfesor.body.id,
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: `PROF-${Date.now()}`,
      titulo: 'Licenciado',
      especialidad: 'Matemáticas'
    });
    expect(profesor.statusCode).toBe(201);

    const materia = await request(app).post('/api/materias').send({
      nombre: 'Álgebra',
      descripcion: 'Matemática básica',
      codigo: `MAT${Math.floor(Math.random() * 10000)}`
    });
    expect(materia.statusCode).toBe(201);

    const cursoRes = await request(app).post('/api/cursos').send({
      profesor_id: profesor.body.id,
      materia_id: materia.body.id,
      anio_academico: 2024,
      cuatrimestre: 1,
      cupo: 35
    });
    expect(cursoRes.statusCode).toBe(201);
    cursoId = cursoRes.body.id;
  });

  it('debería crear una nueva inscripción', async () => {
    const res = await request(app).post('/api/inscripciones').send({
      alumno_id: alumnoId,
      curso_id: cursoId,
      fecha_inscripcion: '2024-01-01'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    inscripcionId = res.body.id;
  });

  it('debería obtener todas las inscripciones', async () => {
    const res = await request(app).get('/api/inscripciones');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería obtener una inscripción por ID', async () => {
    const res = await request(app).get(`/api/inscripciones/${inscripcionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', inscripcionId);
  });

  it('debería actualizar una inscripción', async () => {
    const res = await request(app).put(`/api/inscripciones/${inscripcionId}`).send({
      alumno_id: alumnoId,
      curso_id: cursoId,
      fecha_inscripcion: '2024-02-01'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fecha_inscripcion');
    expect(res.body.fecha_inscripcion.startsWith('2024-02-01')).toBe(true);
  });

  it('debería eliminar una inscripción', async () => {
    const res = await request(app).delete(`/api/inscripciones/${inscripcionId}`);
    expect(res.statusCode).toBe(204);

    const getRes = await request(app).get(`/api/inscripciones/${inscripcionId}`);
    expect(getRes.statusCode).toBe(404);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
