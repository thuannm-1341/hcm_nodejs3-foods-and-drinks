import { AdminOrderController } from '../controllers/admin/order.controller';
import { authenticateAdminRole } from '../middlewares/auth.middleware';
import { AdminController } from '../controllers/admin/admin.controller';
import { Router } from 'express';
const adminRoute: Router = Router();
const adminController = new AdminController();
const adminOrderController = new AdminOrderController();

adminRoute.use(authenticateAdminRole);
adminRoute.get('/home', adminController.getAdminDashboard);
adminRoute.get('/order', adminOrderController.getAdminOrderPage);

export default adminRoute;
