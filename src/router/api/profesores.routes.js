const express = require('express');
const router = express.Router();
const { Profesor } = require('../../database/models');

// Obtener todos los profesores
router.get('/', async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.status(200).json(profesores);
    } catch (error) {
        console.error('❌ Error al obtener profesores:', error);
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
});

// Obtener un profesor por ID
router.get('/:id', async (req, res) => {
    try {
        const profesor = await Profesor.findByPk(req.params.id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    } catch (error) {
        console.error('❌ Error al obtener profesor:', error);
        res.status(500).json({ error: 'Error al obtener el profesor' });
    }
});

// Crear un nuevo profesor
router.post('/', async (req, res) => {
    try {
        const { usuario_id, nombre, apellido, dni, titulo, especialidad } = req.body;

        if (!usuario_id || !nombre || !apellido || !dni || !titulo || !especialidad) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevoProfesor = await Profesor.create({
            usuario_id,
            nombre,
            apellido,
            dni,
            titulo,
            especialidad
        });

        res.status(201).json(nuevoProfesor);
    } catch (error) {
        console.error('❌ Error al crear profesor:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El DNI ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear el profesor' });
    }
});

// Actualizar un profesor
router.put('/:id', async (req, res) => {
    try {
        const { nombre, apellido, dni, titulo, especialidad } = req.body;

        const [updated] = await Profesor.update(
            { nombre, apellido, dni, titulo, especialidad },
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        const profesorActualizado = await Profesor.findByPk(req.params.id);
        res.status(200).json(profesorActualizado);
    } catch (error) {
        console.error('❌ Error al actualizar profesor:', error);
        res.status(500).json({ error: 'Error al actualizar el profesor' });
    }
});

// Eliminar un profesor
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Profesor.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        res.status(204).end();
    } catch (error) {
        console.error('❌ Error al eliminar profesor:', error);
        res.status(500).json({ error: 'Error al eliminar el profesor' });
    }
});

module.exports = router;
