import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const authRoute: Router = Router();
const authController = new AuthController();

authRoute.get('/register', authController.registerGet);
authRoute.post('/register', authController.registerPost);

authRoute.get('/login', authController.loginGet);
authRoute.post('/login', authController.loginPost);

authRoute.get('/admin-login', authController.adminLoginGet);
authRoute.post('/admin-login', authController.adminLoginPost);

authRoute.get('/logout', authController.logout);

export default authRoute;
