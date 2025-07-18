const express = require('express');
const router = express.Router();
const { Carrera } = require('../../database/models'); // Asegúrate que este modelo exista

// Obtener todas las carreras
router.get('/', async (req, res) => {
    try {
        const carreras = await Carrera.findAll();
        res.json(carreras);
    } catch (error) {
        console.error('❌ Error al obtener carreras:', error);
        res.status(500).json({ error: 'Error al obtener las carreras' });
    }
});

// Crear una nueva carrera
router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        }

        const nuevaCarrera = await Carrera.create({ nombre });
        res.status(201).json(nuevaCarrera);
    } catch (error) {
        console.error('❌ Error al crear carrera:', error);
        res.status(500).json({ error: 'Error al crear la carrera' });
    }
});

// Actualizar una carrera por ID
router.put('/:id', async (req, res) => {
    try {
        const { nombre } = req.body;

        const [updated] = await Carrera.update({ nombre }, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        const carreraActualizada = await Carrera.findByPk(req.params.id);
        res.json(carreraActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar carrera:', error);
        res.status(500).json({ error: 'Error al actualizar la carrera' });
    }
});

// Eliminar una carrera por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Carrera.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        res.status(204).end();
    } catch (error) {
        console.error('❌ Error al eliminar carrera:', error);
        res.status(500).json({ error: 'Error al eliminar la carrera' });
    }
});

module.exports = router;
