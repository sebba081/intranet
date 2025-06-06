const express = require('express');
const router = express.Router();

// Importar y usar las rutas
router.use('/', require('./login'));
router.use('/home', require('./home'));

module.exports = router;