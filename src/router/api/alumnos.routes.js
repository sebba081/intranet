const express = require('express');
const router = express.Router();
const Usuario = require('../../../public/class/Usuario');

// Simulación de una base de datos en memoria
const usuarios = [];

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET estudiantes');
});
router.put('/:id', (req, res) => {
    res.send(`PUT estudiante con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE estudiante con ID: ${req.params.id}`);
});

// Ruta para crear un nuevo usuario
router.post('/usuarios', (req, res) => {
  const { correo, password, rol } = req.body;

  // Validar datos
  if (!correo || !password || !rol) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Verificar si el correo ya existe
  const existeUsuario = usuarios.find(u => u.correo === correo);
  if (existeUsuario) {
    return res.status(409).json({ error: 'El correo ya está registrado' });
  }

  // Crear nuevo usuario
  const nuevoUsuario = new Usuario(usuarios.length + 1, correo, password, rol);
  usuarios.push(nuevoUsuario);

  res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});


module.exports = router;
