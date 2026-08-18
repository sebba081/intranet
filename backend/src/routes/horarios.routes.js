'use strict';

/**
 * Rutas de /api/horarios.
 * Sólo declaran: endpoint -> validador -> controlador.
 */

const { Router } = require('express');
const controller = require('../controllers/horarios.controller');
const validator = require('../validators/horarios.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.delete('/:id', controller.eliminar);

module.exports = router;
