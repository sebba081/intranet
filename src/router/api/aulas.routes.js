const express = require('express');
const router = express.Router();
const { Aula } = require('../../database/models');

// Obtener todas las aulas
router.get('/', async (req, res) => {
  try {
    const aulas = await Aula.findAll();
    res.json(aulas);
  } catch (error) {
    console.error('❌ Error al obtener las aulas:', error);
    res.status(500).json({ error: 'Error al obtener las aulas' });
  }
});

// Obtener un aula por ID
router.get('/:id', async (req, res) => {
  try {
    const aula = await Aula.findByPk(req.params.id);
    if (!aula) {
      return res.status(404).json({ error: 'Aula no encontrada' });
    }
    res.json(aula);
  } catch (error) {
    console.error('❌ Error al obtener el aula:', error);
    res.status(500).json({ error: 'Error al obtener el aula' });
  }
});

// Crear una nueva aula
router.post('/', async (req, res) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;

    if (!nombre || !ubicacion || capacidad == null) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaAula = await Aula.create({ nombre, ubicacion, capacidad });
    res.status(201).json(nuevaAula);
  } catch (error) {
    console.error('❌ Error al crear el aula:', error);
    res.status(500).json({ error: 'Error al crear el aula' });
  }
});

// Actualizar un aula
router.put('/:id', async (req, res) => {
  try {
    const { nombre, ubicacion, capacidad } = req.body;

    const [updated] = await Aula.update({ nombre, ubicacion, capacidad }, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Aula no encontrada' });
    }

    const aulaActualizada = await Aula.findByPk(req.params.id);
    res.json(aulaActualizada);
  } catch (error) {
    console.error('❌ Error al actualizar el aula:', error);
    res.status(500).json({ error: 'Error al actualizar el aula' });
  }
});

// Eliminar un aula
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Aula.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Aula no encontrada' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('❌ Error al eliminar el aula:', error);
    res.status(500).json({ error: 'Error al eliminar el aula' });
  }
});

module.exports = router;
