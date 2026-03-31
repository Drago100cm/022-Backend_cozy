const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/provider.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require('../middleware/permisos');

router.post('/guardarRegistro', auth, requirePermission('PROVIDER_CREATE'), ProviderController.guardar);
router.get('/listar', auth, ProviderController.listarTodos);
router.get('/buscarid/:id', auth, ProviderController.BuscarId);
router.patch('/actualizar/:id', auth, requirePermission('PROVIDER_UPDATE'), ProviderController.actualizar);
router.delete('/eliminar/:id', auth, requirePermission('PROVIDER_DELETE'), ProviderController.eliminar);

module.exports = router;