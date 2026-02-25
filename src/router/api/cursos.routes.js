const express = require('express');
const router = express.Router();
const { Curso } = require('../../database/models');

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    console.error('❌ Error al obtener cursos:', error);
    res.status(500).json({ error: 'Error al obtener los cursos', details: error.message });
  }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al obtener curso:', error);
    res.status(500).json({ error: 'Error al obtener el curso', details: error.message });
  }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const { profesor_id, materia_id, anio_academico, cuatrimestre, cupo } = req.body;

    if (!profesor_id || !materia_id || !anio_academico || !cuatrimestre || !cupo) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoCurso = await Curso.create({ profesor_id, materia_id, anio_academico, cuatrimestre, cupo });
    res.status(201).json(nuevoCurso);
  } catch (error) {
    console.error('❌ Error al crear curso:', error);
    res.status(500).json({ error: 'Error al crear el curso', details: error.message });
  }
});

// Actualizar un curso
router.put('/:id', async (req, res) => {
  try {
    const { profesor_id, materia_id, anio_academico, cuatrimestre, cupo } = req.body;

    const [updated] = await Curso.update(
      { profesor_id, materia_id, anio_academico, cuatrimestre, cupo },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedCurso = await Curso.findByPk(req.params.id);
      res.status(200).json(updatedCurso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al actualizar curso:', error);
    res.status(500).json({ error: 'Error al actualizar el curso', details: error.message });
  }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Curso.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al eliminar curso:', error);
    res.status(500).json({ error: 'Error al eliminar el curso', details: error.message });
  }
});

module.exports = router;
