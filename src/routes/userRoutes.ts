import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { Role } from '../types';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/profile', authMiddleware, userController.getProfile.bind(userController));
router.put('/profile', authMiddleware, userController.updateProfile.bind(userController));
router.get('/', authMiddleware, roleMiddleware(Role.ADMIN), userController.getAllUsers.bind(userController));
router.delete('/:id', authMiddleware, roleMiddleware(Role.ADMIN), userController.deleteUser.bind(userController));

export default router;