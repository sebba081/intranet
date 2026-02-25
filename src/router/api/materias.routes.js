const express = require('express');
const router = express.Router();
const { Materia } = require('../../database/models');

// Obtener todas las materias
router.get('/', async (req, res) => {
    try {
        const materias = await Materia.findAll();
        res.json(materias);
    } catch (error) {
        console.error('❌ Error al obtener materias:', error);
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
        console.error('❌ Error al obtener materia:', error);
        res.status(500).json({ error: 'Error al obtener la materia' });
    }
});

// Crear una nueva materia
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, codigo } = req.body;

        if (!nombre || !codigo) {
            return res.status(400).json({ error: 'Los campos "nombre" y "codigo" son obligatorios' });
        }

        const nuevaMateria = await Materia.create({ nombre, descripcion, codigo });
        res.status(201).json(nuevaMateria);
    } catch (error) {
        console.error('❌ Error al crear materia:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El código de materia ya existe' });
        }

        res.status(500).json({ error: 'Error al crear la materia' });
    }
});

// Actualizar una materia
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, codigo } = req.body;

        const [updated] = await Materia.update({ nombre, descripcion, codigo }, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }

        const materiaActualizada = await Materia.findByPk(req.params.id);
        res.json(materiaActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar materia:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El código de materia ya existe' });
        }

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
        console.error('❌ Error al eliminar materia:', error);
        res.status(500).json({ error: 'Error al eliminar la materia' });
    }
});

module.exports = router;
