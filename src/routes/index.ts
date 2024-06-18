import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import authRoute from './auth.route';
import productRoute from './product.route';
import cartRoute from './cart.route';
import orderRoute from './order.route';
import adminRoute from './admin.route';
import userRoute from './user.route';
import fileRoute from './file.route';
const router: Router = Router();
const productController = new ProductController();

router.use('/auth', authRoute);
router.use('/products', productRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/admin', adminRoute);
router.use('/user', userRoute);
router.use('/file', fileRoute);
router.use('/home', productController.getHomePage);
router.use('/', productController.getNotFoundPage);

export default router;
