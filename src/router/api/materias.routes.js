const express = require('express');
const router = express.Router();
const { Materia } = require('../../database/models');

// Obtener todas las materias
router.get('/', async (req, res) => {
    try {
        const materias = await Materia.findAll();
        res.json(materias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las materias' });
    }
});

// Obtener una materia por ID
router.get('/:id', async (req, res) => {
    try {
        const materia = await Materia.findByPk(req.params.id);
        if (!materia) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }
        res.json(materia);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la materia' });
    }
});

// Crear una nueva materia
router.post('/', async (req, res) => {
    try {
        const nuevaMateria = await Materia.create(req.body);
        res.status(201).json(nuevaMateria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la materia' });
    }
});

// Actualizar una materia
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Materia.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }
        const materiaActualizada = await Materia.findByPk(req.params.id);
        res.json(materiaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la materia' });
    }
});

// Eliminar una materia
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Materia.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la materia' });
    }
});

module.exports = router;
