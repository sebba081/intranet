const express = require('express');
const router = express.Router();
const { Horario } = require('../../database/models');

// Obtener todos los horarios
router.get('/', async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.json(horarios);
  } catch (error) {
    console.error('❌ Error al obtener horarios:', error);
    res.status(500).json({ error: 'Error al obtener los horarios' });
  }
});

// Obtener un horario por ID
router.get('/:id', async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(horario);
  } catch (error) {
    console.error('❌ Error al obtener horario:', error);
    res.status(500).json({ error: 'Error al obtener el horario' });
  }
});

// Crear un nuevo horario
router.post('/', async (req, res) => {
  try {
    const { curso_id, aula_id, dia, hora_inicio, hora_fin } = req.body;

    if (!curso_id || !aula_id || !dia || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const valoresPermitidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    if (!valoresPermitidos.includes(dia)) {
      return res.status(400).json({ error: `El día debe ser uno de: ${valoresPermitidos.join(', ')}` });
    }

    const nuevoHorario = await Horario.create({ curso_id, aula_id, dia, hora_inicio, hora_fin });
    res.status(201).json(nuevoHorario);
  } catch (error) {
    console.error('❌ Error al crear horario:', error);
    res.status(500).json({ error: 'Error al crear el horario' });
  }
});

// Actualizar un horario
router.put('/:id', async (req, res) => {
  try {
    const { curso_id, aula_id, dia, hora_inicio, hora_fin } = req.body;

    const [updated] = await Horario.update(
      { curso_id, aula_id, dia, hora_inicio, hora_fin },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    const horarioActualizado = await Horario.findByPk(req.params.id);
    res.json(horarioActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar horario:', error);
    res.status(500).json({ error: 'Error al actualizar el horario' });
  }
});

// Eliminar un horario
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Horario.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('❌ Error al eliminar horario:', error);
    res.status(500).json({ error: 'Error al eliminar el horario' });
  }
});

module.exports = router;
