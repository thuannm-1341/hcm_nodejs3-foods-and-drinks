import { AdminOrderController } from '../controllers/admin/order.controller';
import { authenticateAdminRole } from '../middlewares/auth.middleware';
import { AdminController } from '../controllers/admin/admin.controller';
import { Router } from 'express';
import { AdminProductController } from '../controllers/admin/product.controller';
import { AdminUserController } from '../controllers/admin/user.controller';
const adminRoute: Router = Router();
const adminController = new AdminController();
const adminOrderController = new AdminOrderController();
const adminProductController = new AdminProductController();
const adminUserController = new AdminUserController();

adminRoute.use(authenticateAdminRole);
adminRoute.get('/home', adminController.getAdminDashboard);

adminRoute.get('/order', adminOrderController.getAdminOrderPage);
adminRoute.put('/order/update-store', adminOrderController.updateOrderStore);
adminRoute.put('/order/update', adminOrderController.updateOrderStatus);
adminRoute.get('/order/:id', adminOrderController.getOrderDetail);

adminRoute.get('/product/search', adminProductController.getAdminProductPage);
adminRoute.get('/product/create', adminProductController.adminCreateProductGet);
adminRoute.post(
  '/product/create',
  adminProductController.adminCreateProductPost,
);
adminRoute.get(
  '/product/:id/update',
  adminProductController.adminUpdateProductGet,
);
adminRoute.post(
  '/product/:id/update',
  adminProductController.adminUpdateProductPost,
);
adminRoute.get('/product/:id', adminProductController.getAdminProductDetail);

adminRoute.get('/user', adminUserController.getAdminUserPage);
adminRoute.get('/user/:id', adminUserController.adminGetUserDetail);

export default adminRoute;
