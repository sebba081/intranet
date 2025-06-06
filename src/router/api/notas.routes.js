const express = require('express');
const router = express.Router();

//rutas contolador de estudiantes
router.get('/', (req, res) => {
    res.send('GET notas');
});

router.post('/', (req, res) => {
    res.send('POST notas');
});

router.put('/:id', (req, res) => {
    res.send(`PUT nota con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE nota con ID: ${req.params.id}`);
});

// Exportar el router

module.exports = router;
