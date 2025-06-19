const express = require('express');
const router = express.Router();

// REFERENCIAS
const alumnosRoutes = require('./alumnos.routes.js');
const carrerasRoutes = require('./carreras.routes.js');
const cursosRoutes = require('./cursos.routes.js');
const materiasRoutes = require('./materias.routes.js');
const notasRoutes = require('./notas.routes.js');
const profesoresRoutes = require('./profesores.routes.js');
const usuariosRoutes = require('./usuarios.routes.js');
const administradoresRoutes = require('./administradores.routes.js');
const aulasRoutes = require('./aulas.routes.js');
const inscripcionesRoutes = require('./inscripciones.routes.js');

// Importar y usar las rutas
router.use('/alumnos', alumnosRoutes);
router.use('/carreras', carrerasRoutes);
router.use('/cursos', cursosRoutes);
router.use('/materias', materiasRoutes);
router.use('/notas', notasRoutes);
router.use('/profesores', profesoresRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/administradores', administradoresRoutes);
router.use('/aulas', aulasRoutes);
router.use('/inscripciones', inscripcionesRoutes);

module.exports = router;