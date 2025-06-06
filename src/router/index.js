const express = require('express');
const router = express.Router();
const isAuthenticated = require('./middlewares/isAuthenticated');

// manejo de rutas de vista y apis

router.use('/api/', require('./api/indexApi'));
router.use('/', require('./controllers/indexController'));

module.exports = router;