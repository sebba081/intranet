const express = require('express');
const router = express.Router();

router.use('/api/', require('./api/indexApi'));
router.use('/', require('./controllers/indexController'));

module.exports = router;