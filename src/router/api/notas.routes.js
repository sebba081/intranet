const express = require('express');
const router = express.Router();
const { Calificacion, Inscripcion } = require('../../database/models');

// Obtener todas las calificaciones
router.get('/', async (req, res) => {
    try {
        const notas = await Calificacion.findAll();
        res.json(notas);
    } catch (error) {
        console.error('❌ Error al obtener calificaciones:', error);
        res.status(500).json({ error: 'Error al obtener las calificaciones' });
    }
});

// Obtener una calificación por ID
router.get('/:id', async (req, res) => {
    try {
        const nota = await Calificacion.findByPk(req.params.id);
        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.json(nota);
    } catch (error) {
        console.error('❌ Error al obtener nota:', error);
        res.status(500).json({ error: 'Error al obtener la nota' });
    }
});

// Crear una nueva calificación
router.post('/', async (req, res) => {
    try {
        const { inscripcion_id, nota, fecha } = req.body;

        if (!inscripcion_id || nota == null || !fecha) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const inscripcion = await Inscripcion.findByPk(inscripcion_id);
        if (!inscripcion) {
            return res.status(400).json({ error: 'Inscripción no válida' });
        }

        const nuevaNota = await Calificacion.create({ inscripcion_id, nota, fecha });
        res.status(201).json(nuevaNota);
    } catch (error) {
        console.error('❌ Error al crear nota:', error.message, error);
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una calificación
router.put('/:id', async (req, res) => {
    try {
        const { inscripcion_id, nota, fecha } = req.body;

        const [updated] = await Calificacion.update(
            { inscripcion_id, nota, fecha },
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        const notaActualizada = await Calificacion.findByPk(req.params.id);
        res.json(notaActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar nota:', error.message, error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una calificación
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Calificacion.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        res.status(204).end();
    } catch (error) {
        console.error('❌ Error al eliminar nota:', error.message, error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
