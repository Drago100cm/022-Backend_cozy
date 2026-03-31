const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require('../middleware/permisos');

router.post('/guardarRegistro', auth, requirePermission('PRODUCT_CREATE'), ProductController.guardar);
router.get('/listar', auth, ProductController.listarTodos);
router.get('/buscarid/:id', auth, ProductController.BuscarId);
router.patch('/actualizar/:id', auth, requirePermission('PRODUCT_UPDATE'), ProductController.actualizar);
router.delete('/eliminar/:id', auth, requirePermission('PRODUCT_DELETE'), ProductController.eliminar);

module.exports = router;