'use strict';

/**
 * Rutas de /api/notas.
 * Clave compuesta en la URL: /:inscripcion_id/:evaluacion_id
 */

const { Router } = require('express');
const controller = require('../controllers/notas.controller');
const validator = require('../validators/notas.validator');

const router = Router();

router.get('/', controller.listar);
router.get('/:inscripcion_id/:evaluacion_id', controller.obtener);
router.post('/', validator.crear, controller.crear);
router.put('/:inscripcion_id/:evaluacion_id', validator.actualizar, controller.actualizar);
router.delete('/:inscripcion_id/:evaluacion_id', controller.eliminar);

module.exports = router;
