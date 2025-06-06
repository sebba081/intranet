const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET profesores');
});

router.post('/', (req, res) => {
    res.send('POST profesores');
});

router.put('/:id', (req, res) => {
    res.send(`PUT profesor con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE profesor con ID: ${req.params.id}`);
});

// Exportar el router

module.exports = router;
