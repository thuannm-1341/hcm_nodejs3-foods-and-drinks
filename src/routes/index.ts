import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import authRoute from './auth.route';
const router: Router = Router();
const productController = new ProductController();

router.use('/auth', authRoute);
router.use('/', productController.getHomePage);

export default router;
