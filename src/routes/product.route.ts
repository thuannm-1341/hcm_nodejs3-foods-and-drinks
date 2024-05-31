import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
const productRoute: Router = Router();
const productController = new ProductController();

productRoute.get('/search', productController.getUserProductPage);
productRoute.get('/:id', productController.getProductDetail);

export default productRoute;
