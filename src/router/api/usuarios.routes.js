const express = require('express');
const router = express.Router();
const { Usuario } = require('../../database/models'); 

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
});

// obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id); // Usar findByPk en lugar de findById
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.send(user);
    } catch (error) {
        res.status(500).send('Error al obtener usuario');
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        console.log('Creando nuevo usuario:', req.body); //  imprime los datos del nuevo usuario en consola
        const newUser = await Usuario.create(req.body); 
        res.status(201).send(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error); // 👈 imprime el error real
        res.status(400).json({ error: error.message });
    }
});


// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id); // Usar findByPk en lugar de findById
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.send(user);
    } catch (error) {
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
        res.status(204).send(); // ✅ sin cuerpo
    } catch (error) {
        res.status(500).send('Error al eliminar usuario');
    }
});

module.exports = router;