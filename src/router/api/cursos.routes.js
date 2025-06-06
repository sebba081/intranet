const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET cursos');
});

router.post('/', (req, res) => {
    res.send('POST cursos');
});

router.put('/:id', (req, res) => {
    res.send(`PUT curso con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE curso con ID: ${req.params.id}`);
});

// Exportar el router

module.exports = router;
