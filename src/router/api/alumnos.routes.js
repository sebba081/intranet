const express = require('express');
const router = express.Router();
const alumnos = require('../../../public/class/Alumno');

// Ruta para obtener todos los alumnos
router.get('/', async (req, res) => {
    const alumnosDB = await alumnos.find({});
    res.json(alumnosDB);
});

// Ruta para obtener un alumno por ID
router.get('/:id', async (req, res) => {
    const alumnoDB = await alumnos.findById(req.params.id);
    if (!alumnoDB) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(alumnoDB);
});

// Ruta para crear un nuevo alumno
router.post('/', async (req, res) => {
    const { usuario_id, nombre, apellido, dni, fecha_nacimiento, telefono, direccion } = req.body;
    const alumno = new alumnos(usuario_id, nombre, apellido, dni, fecha_nacimiento, telefono, direccion);
    await alumno.save();
    res.status(201).json(alumno);
    // Enviar correo electrónico al alumno
    //...
});

// Ruta para actualizar un alumno
router.put('/:id', async (req, res) => {
    const { nombre, apellido, dni, fecha_nacimiento, telefono, direccion } = req.body;
    const alumnoDB = await alumnos.findByIdAndUpdate(req.params.id, { nombre, apellido, dni, fecha_nacimiento, telefono, direccion }, { new: true });
    if (!alumnoDB) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(alumnoDB);
});

// Ruta para eliminar un alumno
router.delete('/:id', async (req, res) => {
    const alumnoDB = await alumnos.findByIdAndDelete(req.params.id);
    if (!alumnoDB) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.status(204).end();
});

// Exportar el router
module.exports = router;
