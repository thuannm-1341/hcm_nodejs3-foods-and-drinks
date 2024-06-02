import { authenticateJwt } from '../middlewares/auth.middleware';
import { CartController } from './../controllers/cart.controller';
import { Router } from 'express';

const cartRoute: Router = Router();
const cartController = new CartController();

cartRoute.use(authenticateJwt);
cartRoute.get('/', cartController.viewCart);
cartRoute.post('/add', cartController.addToCart);
cartRoute.post('/update', cartController.updateCart);

export default cartRoute;
