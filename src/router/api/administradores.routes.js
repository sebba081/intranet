const express = require('express');
const router = express.Router();
const { Administrador } = require('../../database/models');

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    console.error('❌ Error al obtener los administradores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un administrador por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }
    res.json(administrador);
  } catch (error) {
    console.error('❌ Error al buscar administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  try {
    const nuevo = await Administrador.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear administrador:', error);
    res.status(500).json({ error: 'Error interno al crear administrador' });
  }
});

// Actualizar un administrador
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Administrador.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    const actualizado = await Administrador.findByPk(req.params.id);
    res.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar administrador:', error);
    res.status(500).json({ error: 'Error interno al actualizar administrador' });
  }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Administrador.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('❌ Error al eliminar administrador:', error);
    res.status(500).json({ error: 'Error interno al eliminar administrador' });
  }
});

module.exports = router;
