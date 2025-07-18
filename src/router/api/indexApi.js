const express = require('express');
const router = express.Router();

// API Routes (prefijos REST)
const administradoresRoutes = require('./administradores.routes.js');
const alumnosRoutes = require('./alumnos.routes.js');
const aulasRoutes = require('./aulas.routes.js');
const carrerasRoutes = require('./carreras.routes.js');
const cursosRoutes = require('./cursos.routes.js');
const inscripcionesRoutes = require('./inscripciones.routes.js');
const materiasRoutes = require('./materias.routes.js');
const notasRoutes = require('./notas.routes.js');
const profesoresRoutes = require('./profesores.routes.js');
const usuariosRoutes = require('./usuarios.routes.js');

// Rutas montadas
router.use('/administradores', administradoresRoutes);
router.use('/alumnos', alumnosRoutes);
router.use('/aulas', aulasRoutes);
router.use('/carreras', carrerasRoutes);
router.use('/cursos', cursosRoutes);
router.use('/inscripciones', inscripcionesRoutes);
router.use('/materias', materiasRoutes);
router.use('/notas', notasRoutes);
router.use('/profesores', profesoresRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;
