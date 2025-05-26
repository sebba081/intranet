const express = require('express');
const router = express.Router();

// Importar y usar las rutas
router.use('/home', require('./home'));
router.use('/login', require('./login'));
//router.use('/estudiantes', require('./estudiantes'));
//router.use('/profesores', require('./profesores'));

module.exports = router;