import { Router } from 'express';
import { BienController } from '../controllers/bienController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const bienController = new BienController();

/**
 * @swagger
 * /api/bienes:
 *   post:
 *     summary: Crear un nuevo bien
 *     tags: [Bienes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BienRequest'
 *     responses:
 *       201:
 *         description: Bien creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventario:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Inventario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, bienController.createBien.bind(bienController));

/**
 * @swagger
 * /api/bienes/{inventario}:
 *   get:
 *     summary: Obtener un bien por inventario
 *     tags: [Bienes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventario
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de inventario del bien
 *     responses:
 *       200:
 *         description: Bien encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventario:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Bien no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:inventario', authMiddleware, bienController.getBien.bind(bienController));

/**
 * @swagger
 * /api/bienes:
 *   get:
 *     summary: Obtener todos los bienes
 *     tags: [Bienes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bienes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   inventario:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, bienController.getAllBienes.bind(bienController));

/**
 * @swagger
 * /api/bienes/{inventario}:
 *   put:
 *     summary: Actualizar un bien
 *     tags: [Bienes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventario
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de inventario del bien
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               valor:
 *                 type: number
 *               vehiculo:
 *                 type: boolean
 *               maquinaria:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Bien actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventario:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Bien no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:inventario', authMiddleware, bienController.updateBien.bind(bienController));

/**
 * @swagger
 * /api/bienes/{inventario}:
 *   delete:
 *     summary: Eliminar un bien
 *     tags: [Bienes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventario
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de inventario del bien
 *     responses:
 *       204:
 *         description: Bien eliminado
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Bien no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:inventario', authMiddleware, bienController.deleteBien.bind(bienController));

export default router;