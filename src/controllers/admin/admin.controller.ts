import { AdminService } from '../../services/admin.service';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AdminNavBar } from '../../constants/admin';
import { CustomSessionData } from '../../interfaces/session.interface';
import { OrderService } from '../../services/order.service';
import { formatCurrency } from '../../commons/utils';
import { ProductService } from '../../services/product.service';
import { TOP_PURCHASED_PRODUCT_LIMIT } from '../../constants';

export class AdminController {
  private readonly adminService: AdminService;
  private readonly orderService: OrderService;
  private readonly productService: ProductService;
  constructor() {
    this.adminService = new AdminService();
    this.orderService = new OrderService();
    this.productService = new ProductService();
  }

  public getAdminDashboard = asyncHandler(
    async (req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      const commonData = 
      await this.adminService.getAdminDashboardCommonData();
      const numOfOrderByStatus = 
      await this.orderService.getNumberOfOrderByStatus();
      const numOfOrderByPaymentStatus = 
      await this.orderService.getNumberOfOrderByPaymentStatus();
      const topProducts = await this.productService
        .getTopPurchasedProduct(TOP_PURCHASED_PRODUCT_LIMIT);
      const numOfOrderByStore = 
      await this.orderService.getNumberOfOrderByStore();
      return res.render('admin/home', {
        admin, 
        commonData,
        numOfOrderByStatus,
        numOfOrderByPaymentStatus,
        topProducts,
        numOfOrderByStore,
        formatCurrency,
        currentSite: AdminNavBar.DASHBOARD,
      });
    },
  );
}
