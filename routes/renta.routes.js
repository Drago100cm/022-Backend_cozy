// routes/Renta.routes.js
const express = require('express');
const router = express.Router();
const RentaController = require('../controllers/renta.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");

/**
 * @openapi
 * tags:
 *   - name: Rentas
 *     description: Operaciones con Rentas
 */

/**
 * @openapi
 * /api/Rentas/guardarRegistro:
 *   post:
 *     tags: [Rentas]
 *     summary: Crea un Renta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Renta' }
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Renta' }
 */

// en Renta.routes.js
router.post('/guardarRegistro', auth, requirePermission("RENT_CREATE"),  RentaController.guardar);


/**
 * @openapi
 * /api/Rentas/listar:
 *   get:
 *     tags: [Rentas]
 *     summary: Lista Rentas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Renta' }
 */
router.get('/listar', auth, requirePermission("RENT_LIST"), RentaController.listarTodos);

/**
 * @openapi
 * /api/Rentas/buscarid/{id}:
 *   get:
 *     tags: [Rentas]
 *     summary: Obtiene Renta por ID
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
 *             schema: { $ref: '#/components/schemas/Renta' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id', auth, requirePermission("RENT_LIST"),  RentaController.BuscarId);

/**
 * @openapi
 * /api/Rentas/eliminar/{id}:
 *   delete:
 *     tags: [Rentas]
 *     summary: Elimina Renta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id', auth, requirePermission("RENT_DELETE"),  RentaController.eliminar);

/**
 * @openapi
 * /api/Rentas/actualizar/{id}:
 *   patch:
 *     tags: [Rentas]
 *     summary: Actualiza Renta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Renta' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Renta' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id', auth, requirePermission("RENT_UPDATE"),  RentaController.actualizar);

module.exports = router;
