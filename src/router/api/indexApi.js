const express = require('express');
const router = express.Router();

// REFERENCIAS
const alumnosRoutes = require('./alumnos.routes.js');
const carrerasRoutes = require('./carreras.routes.js');
const cursosRoutes = require('./cursos.routes.js');
const materiasRoutes = require('./materias.routes.js');
const notasRoutes = require('./notas.routes.js');
const profesoresRoutes = require('./profesores.routes.js');

// Importar y usar las rutas
router.use('/alumnos', alumnosRoutes);
router.use('/carreras', carrerasRoutes);
router.use('/cursos', cursosRoutes);
router.use('/materias', materiasRoutes);
router.use('/notas', notasRoutes);
router.use('/profesores', profesoresRoutes);

module.exports = router;