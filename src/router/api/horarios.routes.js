const express = require('express');
const router = express.Router();
const { Horario } = require('../../database/models');

// Obtener todos los horarios
router.get('/', async (req, res) => {
    try {
        const horarios = await Horario.findAll();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
});

// Obtener un horario por ID
router.get('/:id', async (req, res) => {
    try {
        const horario = await Horario.findByPk(req.params.id);
        if (!horario) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }
        res.json(horario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el horario' });
    }
});

// Crear un nuevo horario
router.post('/', async (req, res) => {
    try {
        const nuevoHorario = await Horario.create(req.body);
        res.status(201).json(nuevoHorario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el horario' });
    }
});

// Actualizar un horario
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Horario.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }
        const horarioActualizado = await Horario.findByPk(req.params.id);
        res.json(horarioActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el horario' });
    }
});

// Eliminar un horario
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Horario.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el horario' });
    }
});

module.exports = router; 