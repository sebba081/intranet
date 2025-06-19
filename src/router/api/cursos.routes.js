const express = require('express');
const router = express.Router();
const { Curso } = require('../../database/models');

// Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
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
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ error: 'Error al obtener el curso', details: error.message });
    }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
    try {
        const nuevoCurso = await Curso.create(req.body);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el curso' });
    }
});

// Actualizar un curso
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Curso.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCurso = await Curso.findByPk(req.params.id);
            res.status(200).json(updatedCurso);
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
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
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ error: 'Error al eliminar el curso', details: error.message });
    }
});

// Exportar el router
module.exports = router;