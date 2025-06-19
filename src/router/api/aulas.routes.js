const express = require('express');
const router = express.Router();
const { Aula } = require('../../database/models');

// Obtener todas las aulas
router.get('/', async (req, res) => {
    try {
        const aulas = await Aula.findAll();
        res.json(aulas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las aulas' });
    }
});

// Obtener un aula por ID
router.get('/:id', async (req, res) => {
    try {
        const aula = await Aula.findByPk(req.params.id);
        if (!aula) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }
        res.json(aula);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el aula' });
    }
});

// Crear una nueva aula
router.post('/', async (req, res) => {
    try {
        const nuevaAula = await Aula.create(req.body);
        res.status(201).json(nuevaAula);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el aula' });
    }
});

// Actualizar un aula
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Aula.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }
        const aulaActualizada = await Aula.findByPk(req.params.id);
        res.json(aulaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el aula' });
    }
});

// Eliminar un aula
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Aula.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el aula' });
    }
});

module.exports = router; 