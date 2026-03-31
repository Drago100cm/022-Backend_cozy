const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pago.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require('../middleware/permisos');

router.post('/guardar', auth, PagoController.guardar);
router.post('/enviar-orden/:id', auth, PagoController.enviarOrdenPago);
router.get('/listar', auth, PagoController.listarTodos);
router.get('/buscarid/:id', auth, PagoController.BuscarId);
router.patch('/actualizar/:id', auth, requirePermission('PAGO_UPDATE'), PagoController.actualizar);
router.delete('/eliminar/:id', auth, requirePermission('PAGO_DELETE'), PagoController.eliminar);

module.exports = router;