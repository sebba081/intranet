const express = require('express');
const router = express.Router();
const { Usuario } = require('../../database/models'); // Asegúrate de que esta ruta sea correcta

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.findAll(); // Usar el método de Sequelize
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const newUser = new Usuario(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send('Error al crear usuario');
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id); // Usar findByPk en lugar de findById
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.send(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error); // Log para más detalles
        res.status(500).send('Error al obtener usuario');
    }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id);
        if (!user) return res.status(404).send('Usuario no encontrado');
        await user.update(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send('Error al actualizar usuario');
    }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id);
        if (!user) return res.status(404).send('Usuario no encontrado');
        await user.destroy();
        res.send(user);
    } catch (error) {
        res.status(500).send('Error al eliminar usuario');
    }
});

module.exports = router;