import { OrderController } from './../controllers/order.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRoute: Router = Router();
const orderController = new OrderController();
const userController = new UserController();

userRoute.use(authenticateJwt);
userRoute.get('/order', orderController.getUserOrderPage);
userRoute.get('/profile', userController.getUserProfile);

export default userRoute;
