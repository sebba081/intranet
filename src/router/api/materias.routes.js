const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET materias');
});

router.post('/', (req, res) => {
    res.send('POST materias');
});

router.put('/:id', (req, res) => {
    res.send(`PUT materia con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE materia con ID: ${req.params.id}`);
});

// Exportar el router

module.exports = router;
