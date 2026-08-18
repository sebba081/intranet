'use strict';

/**
 * Rutas de /api/aulas.
 * Sólo declaran: endpoint -> validador -> controlador.
 */

const { Router } = require('express');
const controller = require('../controllers/aulas.controller');
const validator = require('../validators/aulas.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
