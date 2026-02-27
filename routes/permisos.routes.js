// routes/rol.routes.js
const express = require('express');
const router = express.Router();
const RolController = require('../controllers/permisos.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");

/**
 * @openapi
 * tags:
 *   - name: Permiso
 *     description: Operaciones con proveedores
 */

/**
 * @openapi
 * /api/permiso/guardar:
 *   post:
 *     tags: [Permiso]
 *     summary: Crea un proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permiso'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/guardar',auth,requirePermission("PERMISOS_CREATE"), RolController.guardar);

/**
 * @openapi
 * /api/permiso/listar:
 *   get:
 *     tags: [Permiso]
 *     summary: Lista proveedores
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Permiso' }
 */
router.get('/listar',auth,requirePermission("PERMISOS_LIST"), RolController.listar);

/**
 * @openapi
 * /api/permiso/buscarid/{id}:
 *   get:
 *     tags: [Permiso]
 *     summary: Obtiene proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Permiso' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id',auth, requirePermission("PERMISOS_LIST"),  RolController.BuscarId);

/**
 * @openapi
 * /api/permiso/eliminar/{id}:
 *   delete:
 *     tags: [Permiso]
 *     summary: Elimina proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id',auth,requirePermission("PERMISOS_DELETE"), RolController.eliminar);

/**
 * @openapi
 * /api/permiso/actualizar/{id}:
 *   patch:
 *     tags: [Permiso]
 *     summary: Actualiza proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Permiso' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Permiso' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id',auth,requirePermission("PERMISOS_UPDATE"),RolController.actualizar);

module.exports = router;


