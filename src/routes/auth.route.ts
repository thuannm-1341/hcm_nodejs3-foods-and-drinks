import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const router: Router = Router();
const authController = new AuthController();

router.get('/register', authController.registerGet);
router.post('/register', authController.registerPost);

export default router;
