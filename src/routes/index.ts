import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import authRoute from './auth.route';
import productRoute from './product.route';
import cartRoute from './cart.route';
import orderRoute from './order.route';
const router: Router = Router();
const productController = new ProductController();

router.use('/auth', authRoute);
router.use('/products', productRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/', productController.getHomePage);

export default router;
