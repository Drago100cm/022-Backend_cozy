// routes/rol.routes.js
const express = require('express');
const router = express.Router();
const RolController = require('../controllers/rol.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");


/**
 * @openapi
 * tags:
 *   - name: Rol
 *     description: Operaciones con proveedores
 */

/**
 * @openapi
 * /api/roles/guardar:
 *   post:
 *     tags: [Rol]
 *     summary: Crea un rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/guardar',auth,requirePermission("ROL_CREATE"), RolController.guardar);

/**
 * @openapi
 * /api/roles/listar:
 *   get:
 *     tags: [Rol]
 *     summary: Lista roles
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Rol' }
 */
router.get('/listar',auth,requirePermission("ROL_LIST"), RolController.listar);

/**
 * @openapi
 * /api/roles/buscarid/{id}:
 *   get:
 *     tags: [Rol]
 *     summary: Obtiene rol por ID
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
 *             schema: { $ref: '#/components/schemas/Rol' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id',requirePermission("ROL_LIST"),  RolController.BuscarId);

/**
 * @openapi
 * /api/roles/eliminar/{id}:
 *   delete:
 *     tags: [Rol]
 *     summary: Elimina rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id',auth,requirePermission("ROL_DELETE"), RolController.eliminar);

/**
 * @openapi
 * /api/roles/actualizar/{id}:
 *   patch:
 *     tags: [Rol]
 *     summary: Actualiza rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Rol' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Rol' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id',auth,requirePermission("ROL_UPDATE"),  RolController.actualizar);

module.exports = router;
