const express = require('express');
const router = express.Router();
const { Inscripcion } = require('../../database/models');

// Obtener todas las inscripciones
router.get('/', async (req, res) => {
    try {
        const inscripciones = await Inscripcion.findAll();
        res.json(inscripciones);
    } catch (error) {
        console.error('❌ Error al obtener inscripciones:', error);
        res.status(500).json({ error: 'Error al obtener las inscripciones' });
    }
});

// Obtener una inscripcion por ID
// Obtener una inscripción por ID
router.get('/:id', async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByPk(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        console.error('❌ Error al obtener inscripción:', error);
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
// Crear una nueva inscripción
router.post('/', async (req, res) => {
    try {
        const { alumno_id, curso_id, fecha_inscripcion } = req.body;

        if (!alumno_id || !curso_id || !fecha_inscripcion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nueva = await Inscripcion.create({
            alumno_id,
            curso_id,
            fecha_inscripcion
        });

        res.status(201).json(nueva);
    } catch (error) {
        console.error('❌ Error al crear inscripción:', error);

        // Detectar duplicado por clave única alumno_id + curso_id
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Ya existe una inscripción para este alumno en este curso' });
        }

        res.status(500).json({ error: 'Error al crear la inscripción', detalle: error.message });
    }
});

// Actualizar una inscripción
router.put('/:id', async (req, res) => {
    try {
        const { alumno_id, curso_id, fecha_inscripcion } = req.body;

        const [updated] = await Inscripcion.update(
            { alumno_id, curso_id, fecha_inscripcion },
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }

        const actualizada = await Inscripcion.findByPk(req.params.id);
        res.json(actualizada);
    } catch (error) {
        console.error('❌ Error al actualizar inscripción:', error);
        res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
});

// Eliminar una inscripcion
// Eliminar una inscripción
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

        if (!deleted) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }

        res.status(204).end();
    } catch (error) {
        console.error('❌ Error al eliminar inscripción:', error);
        res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
});

module.exports = router;
