const express = require('express');
const router = express.Router();
const { Profesor } = require('../../database/models'); // Asegúrate de que esta ruta sea correcta

// Obtener todos los profesores
router.get('/', async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
});

// Obtener un profesor por ID
router.get('/:id', async (req, res) => {
    try {
        const profesor = await Profesor.findByPk(req.params.id);
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.status(200).json(profesor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el profesor' });
    }
});

// Crear un nuevo profesor
router.post('/', async (req, res) => {
    try {
        const nuevoProfesor = await Profesor.create(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el profesor' });
    }
});

// Actualizar un profesor por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Profesor.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProfesor = await Profesor.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedProfesor);
        } else {
            res.status(404).json({ error: 'Profesor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el profesor' });
    }
});

// Eliminar un profesor por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Profesor.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Profesor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el profesor' });
    }
});

// Exportar el router
module.exports = router;