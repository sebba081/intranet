const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/isAuthenticated');

// Ruta para la vista de login

router.get('/', (req, res) => {
  res.render('login', { titulo: 'Login' });
});

router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { titulo: 'Login', error });
});

// Ruta para el controlador de login
router.post('/login', authMiddleware, (req, res) => {
  if (req.authError) {
    return res.redirect(`/login?error=${encodeURIComponent(req.authError)}`);
  }
  res.redirect('/home');
});

module.exports = router;