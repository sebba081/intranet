const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de usuarios', () => {
  let userId = null;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('debería crear un nuevo usuario', async () => {
    const res = await request(app).post('/api/usuarios').send({
      email: `test-${Date.now()}@mail.com`,
      password: 'secreto123',
      rol: 'alumno'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('debería obtener todos los usuarios', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería obtener un usuario por ID', async () => {
    const res = await request(app).get(`/api/usuarios/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('debería actualizar un usuario', async () => {
    const res = await request(app).put(`/api/usuarios/${userId}`).send({
      password: 'nuevoPassword123'
    });
    expect(res.statusCode).toBe(200);
  });

  it('debería eliminar un usuario', async () => {
    const res = await request(app).delete(`/api/usuarios/${userId}`);
    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
