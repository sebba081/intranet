const express = require('express');
const router = express.Router();

// Ruta para la vista de login

router.get('/', (req, res) => {
    res.render('login', { titulo: 'Login' });
});

// Ruta para el controlador de login

module.exports = router;