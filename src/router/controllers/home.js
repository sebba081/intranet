const express = require('express');
const router = express.Router();

// Ruta para la vista principal
router.get('/', (req, res) => {
  res.render('estudiantes/homeEstudiantes', {
    titulo: 'Home',
    estudiante: { nombre: 'Estudiante' },
    totalCursos: 0,
    promedioNotas: 0,
    clasesHoy: 0,
    proximaClase: { hora: 'Sin clases' },
    cursos: [],
    calificaciones: []
  });
});

module.exports = router;
