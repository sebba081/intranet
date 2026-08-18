'use strict';

/**
 * Rutas de /api/establecimientos.
 * Sólo declaran: endpoint -> validador -> controlador.
 */

const { Router } = require('express');
const controller = require('../controllers/establecimientos.controller');
const validator = require('../validators/establecimientos.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.put('/:id', validator.actualizar, controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
