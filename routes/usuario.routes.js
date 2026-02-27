const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");
/**
 * @openapi
 * tags:
 *   - name: Usuarios
 *     description: Operaciones con usuarios
 */

/**
 * @openapi
 * /api/usuarios/registrar:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crea un Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/registrar', UsuarioController.registrar);
/**
 * @openapi
 * /api/usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: loguea un Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201: { description: logueado }
 */
router.post('/login', UsuarioController.login);
/**
 * @openapi
 * /api/usuarios/listar:
 *   get:
 *     tags: [Usuarios]
 *     summary: Lista usuarios
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Usuario' }
 */
// Listar → admin, gerente
router.get('/listar',auth,requirePermission("USER_LIST"), UsuarioController.listar);
/**
 * @openapi
 * /api/usuarios/buscarid/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Buscar usuarios con ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Usuario' }
 */
// Buscar por ID → admin, gerente
router.get('/buscarid/:id',auth, requirePermission("USER_LIST"),UsuarioController.BuscarId);

/**
 * @openapi
 * /api/usuarios/actualizar/{id}:
 *   patch:
 *     tags: [Usuarios]
 *     summary: Actualiza usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Usuario' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Usuarios' }
 *       404: { description: No encontrado }
 */
// Actualizar → admin, gerente, cajero (pero cajero solo a sí mismo)
router.patch('/actualizar/:id',auth,requirePermission("USER_UPDATE"), UsuarioController.actualizar);
/**
 * @openapi
 * /api/usuarios/eliminar/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Elimina usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
// Eliminar → admin, gerente, cajero (cajero solo su cuenta)
router.delete('/eliminar/:id', auth, requirePermission("USER_DELETE"),  UsuarioController.eliminar);

module.exports = router;
