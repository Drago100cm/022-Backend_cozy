// routes/comment.routes.js
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth');

/**
 * @openapi
 * tags:
 *   - name: Comments
 *     description: Operaciones con comentarios
 */

/**
 * @openapi
 * /api/comment/guardarRegistro:
 *   post:
 *     tags: [Comments]
 *     summary: Crear un comentario
 */
router.post('/guardarRegistro', CommentController.guardar);

/**
 * @openapi
 * /api/comment/listar:
 *   get:
 *     tags: [Comments]
 *     summary: Listar comentarios
 */
router.get('/listar',CommentController.listarTodos);

/**
 * @openapi
 * /api/comment/buscarid/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Obtener comentario por ID
 */
router.get('/buscarid/:id',CommentController.BuscarId);

/**
 * @openapi
 * /api/comment/eliminar/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Eliminar comentario
 */
router.delete('/eliminar/:id',CommentController.eliminar);

/**
 * @openapi
 * /api/comment/actualizar/{id}:
 *   patch:
 *     tags: [Comments]
 *     summary: Actualizar comentario
 */
router.patch('/actualizar/:id', CommentController.actualizar);
router.get('/room/:roomId', CommentController.obtenerPorRoom);

module.exports = router;