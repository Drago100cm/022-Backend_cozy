// routes/Room.routes.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/rooms.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");

/**
 * @openapi
 * tags:
 *   - name: Roomes
 *     description: Operaciones con Roomes
 */

/**
 * @openapi
 * /api/Room/guardarRegistro:
 *   post:
 *     tags: [Roomes]
 *     summary: Crea un Room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/guardarRegistro', auth, requirePermission("ROOM_CREATE"), RoomController.guardar);

/**
 * @openapi
 * /api/Room/listar:
 *   get:
 *     tags: [Roomes]
 *     summary: Lista Roomes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Room' }
 */
router.get('/listar', auth, requirePermission("ROOM_LIST"), RoomController.listarTodos);
router.get('/', auth, requirePermission("ROOM_LIST"), RoomController.listarTodos);
/**
 * @openapi
 * /api/Room/buscarid/{id}:
 *   get:
 *     tags: [Roomes]
 *     summary: Obtiene Room por ID
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
 *             schema: { $ref: '#/components/schemas/Room' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id', auth,requirePermission("ROOM_LIST"), RoomController.BuscarId);

/**
 * @openapi
 * /api/Room/eliminar/{id}:
 *   delete:
 *     tags: [Roomes]
 *     summary: Elimina Room por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id', auth, requirePermission("ROOM_DELETE"), RoomController.eliminar);

/**
 * @openapi
 * /api/Room/actualizar/{id}:
 *   patch:
 *     tags: [Roomes]
 *     summary: Actualiza Room por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Room' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Room' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id', auth, requirePermission("ROOM_UPDATE"), RoomController.actualizar);

/**
 * @openapi
 * /api/Room/publicar/{id}:
 *   patch:
 *     tags: [Roomes]
 *     summary: publica Room por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Room' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Room' }
 *       404: { description: No encontrado }
 */
router.patch('/publicar/:id', auth, requirePermission("ROOM_UPDATE"), RoomController.togglePublicado);

module.exports = router;
