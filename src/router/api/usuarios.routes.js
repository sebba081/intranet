const express = require('express');
const router = express.Router();
const { Usuario } = require('../../database/models');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { email, password, rol } = req.body;

        if (!email || !password || !rol) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: email, password o rol' });
        }

        const nuevoUsuario = await Usuario.create({ email, password, rol });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('❌ Error al crear usuario:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }

        res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message });
    }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        console.error('❌ Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('❌ Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;
