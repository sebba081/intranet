'use strict';

/**
 * Rutas de /api/alumnos.
 * Sólo declaran: endpoint -> validador -> controlador.
 */

const { Router } = require('express');
const controller = require('../controllers/alumnos.controller');
const validator = require('../validators/personas.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.put('/:id', controller.actualizar);
router.delete('/:id', controller.eliminar);

module.exports = router;
