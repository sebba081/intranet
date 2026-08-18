'use strict';

/**
 * Rutas de /api/asistencia.
 * Clave compuesta en la URL: /:inscripcion_id/:fecha
 */

const { Router } = require('express');
const controller = require('../controllers/asistencia.controller');
const validator = require('../validators/asistencia.validator');

const router = Router();

router.get('/', controller.listar);
router.post('/', validator.crear, controller.registrar);
router.put('/:inscripcion_id/:fecha', controller.actualizar);
router.delete('/:inscripcion_id/:fecha', controller.eliminar);

module.exports = router;
