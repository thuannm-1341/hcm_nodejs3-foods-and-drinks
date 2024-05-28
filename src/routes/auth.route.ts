import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const authRoute: Router = Router();
const authController = new AuthController();

authRoute.get('/register', authController.registerGet);
authRoute.post('/register', authController.registerPost);

authRoute.get('/login', authController.loginGet);
authRoute.post('/login', authController.loginPost);

export default authRoute;
