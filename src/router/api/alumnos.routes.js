const express = require('express');
const router = express.Router();
const { Alumno } = require('../../database/models');

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    res.json(alumnos);
  } catch (error) {
    console.error('❌ Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// Obtener un alumno por ID
router.get('/:id', async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.id);
    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    console.error('❌ Error al buscar alumno:', error);
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
});

// Crear un nuevo alumno
router.post('/', async (req, res) => {
  try {
    console.log('📩 POST /alumnos:', req.body);

    const {
      usuario_id,
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      carrera
    } = req.body;

    const nuevoAlumno = await Alumno.create({
      usuario_id,
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      carrera
    });

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error('❌ Error al crear alumno:', error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un alumno
router.put('/:id', async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      carrera
    } = req.body;

    const [updated] = await Alumno.update(
      { nombre, apellido, dni, fecha_nacimiento, carrera },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    const alumnoActualizado = await Alumno.findByPk(req.params.id);
    res.json(alumnoActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar alumno:', error);
    res.status(500).json({ error: 'Error al actualizar el alumno' });
  }
});

// Eliminar un alumno
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
    console.error('❌ Error al eliminar alumno:', error);
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

module.exports = router;
