import { authenticateJwt } from '../middlewares/auth.middleware';
import { CartController } from './../controllers/cart.controller';
import { Router } from 'express';

const cartRoute: Router = Router();
const cartController = new CartController();

cartRoute.use(authenticateJwt);
cartRoute.post('/add', cartController.addToCart);

export default cartRoute;
