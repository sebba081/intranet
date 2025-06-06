const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/isAuthenticated');

// Ruta para la vista de login

router.get('/', (req, res) => {
  res.render('login', { titulo: 'Login' });
});

router.get('/login', (req, res) => {
  res.render('login', { titulo: 'Login' });
  res.locals.error = 'Error de login, intente nuevamente.';
  res.locals.user = req.user;
});

// Ruta para el controlador de login
router.post('/login', authMiddleware, (req, res) => {
    if (req.user) {
      const msgError = "Error las creden";
      return res.redirect("/home"); // Redirigir a la página de inicio
    }
    res.redirect('/');
});

module.exports = router;