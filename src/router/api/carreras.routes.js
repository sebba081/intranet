const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET carreras');
});

router.post('/', (req, res) => {
    res.send('POST carreras');
});

router.put('/:id', (req, res) => {
    res.send(`PUT carreras con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE carreras con ID: ${req.params.id}`);
});

// Exportar el router

module.exports = router;
