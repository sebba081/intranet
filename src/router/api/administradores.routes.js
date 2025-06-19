const express = require('express');
const router = express.Router();
const { Administrador } = require('../../database/models');

// Obtener todos los administradores
router.get('/', async (req, res) => {
    try {
        const administradores = await Administrador.findAll();
        res.json(administradores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los administradores' });
    }
});

// Obtener un administrador por ID
router.get('/:id', async (req, res) => {
    try {
        const administrador = await Administrador.findByPk(req.params.id);
        if (!administrador) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        res.json(administrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el administrador' });
    }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
    try {
        const nuevoAdministrador = await Administrador.create(req.body);
        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el administrador' });
    }
});

// Actualizar un administrador
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Administrador.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        const administradorActualizado = await Administrador.findByPk(req.params.id);
        res.json(administradorActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el administrador' });
    }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Administrador.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el administrador' });
    }
});

module.exports = router; 