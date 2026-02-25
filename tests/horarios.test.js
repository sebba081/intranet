const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database/models');

describe('Rutas de horarios', () => {
    let horarioId = null;
    let cursoId = null;
    let aulaId = null;

    let cursoId;
    let aulaId;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const aulaRes = await request(app).post('/api/aulas').send({
            nombre: 'A1',
            ubicacion: 'Edif A',
            capacidad: 50
        });
        aulaId = aulaRes.body.id;

        const usuarioProf = await request(app).post('/api/usuarios').send({
    beforeAll(async () => {
        // Crear materia
        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Informática',
            descripcion: 'Materia de prueba',
            codigo: 'INF-' + Date.now()
        });
        const materiaId = materiaRes.body.id;

        // Crear usuario y profesor
        const usuarioRes = await request(app).post('/api/usuarios').send({
            email: `prof-${Date.now()}@mail.com`,
            password: '123456',
            rol: 'profesor'
        });
        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: usuarioProf.body.id,
            nombre: 'Juan',
            apellido: 'Perez',
            dni: `PROF-${Date.now()}`,
            titulo: 'PhD',
            especialidad: 'Test'
        });

        const materiaRes = await request(app).post('/api/materias').send({
            nombre: 'Historia',
            descripcion: 'Historia',
            codigo: `MAT-${Date.now()}`
        });

        const cursoRes = await request(app).post('/api/cursos').send({
            profesor_id: profesorRes.body.id,
            materia_id: materiaRes.body.id,
            anio_academico: 2024,
            cuatrimestre: 1,
            cupo: 30
        });
        cursoId = cursoRes.body.id;
        const usuarioId = usuarioRes.body.id;

        const profesorRes = await request(app).post('/api/profesores').send({
            usuario_id: usuarioId,
            nombre: 'Ana',
            apellido: 'González',
            dni: 'DNI-' + Date.now(),
            titulo: 'Licenciada',
            especialidad: 'Sistemas'
        });
        const profesorId = profesorRes.body.id;

        // Crear curso válido
        const cursoRes = await request(app).post('/api/cursos').send({
            profesor_id: profesorId,
            materia_id: materiaId,
            anio_academico: 2024,
            cuatrimestre: 1,
            cupo: 40
        });
        cursoId = cursoRes.body.id;

        // Crear aula válida
        const aulaRes = await request(app).post('/api/aulas').send({
            nombre: 'Laboratorio 1',
            capacidad: 25,
            ubicacion: 'Edificio A'
        });
        aulaId = aulaRes.body.id;
    });

    it('debería crear un nuevo horario', async () => {
        const res = await request(app).post('/api/horarios').send({
            curso_id: cursoId,
            aula_id: aulaId,
            dia: 'Lunes',
            hora_inicio: '08:00',
            hora_fin: '10:00'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        horarioId = res.body.id;
    });

    it('debería obtener un horario por ID', async () => {
        const res = await request(app).get(`/api/horarios/${horarioId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', horarioId);
    });

    it('debería actualizar un horario', async () => {
        const res = await request(app).put(`/api/horarios/${horarioId}`).send({
            curso_id: cursoId,
            aula_id: aulaId,
            dia: 'Martes',
            hora_inicio: '10:00',
            hora_fin: '12:00'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.dia).toBe('Martes');
    });

    it('debería eliminar un horario', async () => {
        const res = await request(app).delete(`/api/horarios/${horarioId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get(`/api/horarios/${horarioId}`);
        expect(getRes.statusCode).toBe(404);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
