const express = require('express');
const router = express.Router();
const SolicitudController = require('../controllers/solicitudDeRenta.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require('../middleware/permisos');

router.post('/guardar', auth, SolicitudController.guardar);
router.get('/listar', auth, SolicitudController.listarTodos);
router.get('/buscarid/:id', auth, SolicitudController.BuscarId);
router.patch('/actualizar/:id', auth, requirePermission('SOLICITUD_UPDATE'), SolicitudController.actualizar);
router.delete('/eliminar/:id', auth, requirePermission('SOLICITUD_DELETE'), SolicitudController.eliminar);

module.exports = router;