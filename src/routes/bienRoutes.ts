import { Router } from 'express';
import { BienController } from '../controllers/bienController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const bienController = new BienController();

router.post('/', authMiddleware, bienController.createBien.bind(bienController));
router.get('/:inventario', authMiddleware, bienController.getBien.bind(bienController));
router.get('/', authMiddleware, bienController.getAllBienes.bind(bienController));
router.put('/:inventario', authMiddleware, bienController.updateBien.bind(bienController));
router.delete('/:inventario', authMiddleware, bienController.deleteBien.bind(bienController));

export default router;