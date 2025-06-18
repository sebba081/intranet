const express = require('express');
const router = express.Router();
const { Alumno } = require('../../database/models'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const alumnosDB = await Alumno.findAll();
        res.json(alumnosDB);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
});

// Ruta para obtener un alumno por ID
router.get('/:id', async (req, res) => {
    try {
        const alumnoDB = await Alumno.findByPk(req.params.id);
        if (!alumnoDB) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.json(alumnoDB);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el alumno' });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos en POST /api/alumnos:', req.body); // 👈 revisa esto en la consola

        const { usuario_id, nombre, apellido, dni, fecha_nacimiento, telefono, direccion, carrera } = req.body;

        const alumno = await Alumno.create({
            usuario_id, nombre, apellido, dni, fecha_nacimiento, telefono, direccion, carrera
        });

        res.status(201).json(alumno);
    } catch (error) {
        console.error('Error al crear alumno:', error);
        res.status(500).json({ error: error.message });
    }
});


// Ruta para actualizar un alumno
router.put('/:id', async (req, res) => {
    try {
        const { nombre, apellido, dni, fecha_nacimiento, telefono, direccion, carrera } = req.body;
        const [updated] = await Alumno.update({ nombre, apellido, dni, fecha_nacimiento, telefono, direccion, carrera }, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        const updatedAlumno = await Alumno.findByPk(req.params.id);
        res.json(updatedAlumno);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
});

// Ruta para eliminar un alumno
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Alumno.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
});

// Exportar el router
module.exports = router;