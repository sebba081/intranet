const express = require('express');
const router = express.Router();
const { Inscripcion } = require('../../database/models');

// Obtener todas las inscripciones
router.get('/', async (req, res) => {
    try {
        const inscripciones = await Inscripcion.findAll();
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las inscripciones' });
    }
});

// Obtener una inscripcion por ID
router.get('/:id', async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByPk(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la inscripción' });
    }
});

// Crear una nueva inscripcion
router.post('/', async (req, res) => {
    try {
        const nuevaInscripcion = await Inscripcion.create(req.body);
        res.status(201).json(nuevaInscripcion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la inscripción' });
    }
});

// Actualizar una inscripcion
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Inscripcion.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        const inscripcionActualizada = await Inscripcion.findByPk(req.params.id);
        res.json(inscripcionActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
});

// Eliminar una inscripcion
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Inscripcion.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
});

module.exports = router;
