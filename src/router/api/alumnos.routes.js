const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET estudiantes');
});

router.post('/', (req, res) => {
    res.send('POST estudiantes');
});

router.put('/:id', (req, res) => {
    res.send(`PUT estudiante con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE estudiante con ID: ${req.params.id}`);
});

// Exportar el router


module.exports = router;
