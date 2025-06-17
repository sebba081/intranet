const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET usuarios');
});

router.post('/', (req, res) => {
    res.send('POST usuarios');
});

// rutas con integracion a bd
const User = require('../../../public/class/Usuario');

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
});


module.exports = router;
