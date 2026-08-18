'use strict';

/**
 * Rutas de /api/inscripciones.
 * Sólo declaran: endpoint -> validador -> controlador.
 */

const { Router } = require('express');
const controller = require('../controllers/inscripciones.controller');
const validator = require('../validators/inscripciones.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.delete('/:id', controller.eliminar);

module.exports = router;
