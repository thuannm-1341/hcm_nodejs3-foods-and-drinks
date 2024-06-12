import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import { OrderService } from '../../services/order.service';
import { CustomSessionData } from '../../interfaces/session.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { OrderPageOptions } from '../../commons/dtos/orderPageOptions.dto';
import { formatDate, handleError } from '../../commons/utils';
import { AdminNavBar } from '../../constants/admin';

export class AdminOrderController {
  private readonly orderService: OrderService;
  constructor(){
    this.orderService = new OrderService();
  }

  public getAdminOrderPage = asyncHandler(
    async (req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      const pageOptions = plainToClass(OrderPageOptions, req.query);
      const rawErrors = await validate(pageOptions);
      if( rawErrors.length > 0 ){
        const errors = handleError(rawErrors, req, res);
        return res.render('admin/order/list', {
          admin,
          currentSite: AdminNavBar.ORDER,
          errors, 
          query: pageOptions,
        });
      }
      const orderPage = await this.orderService.getOrderPage(pageOptions);
      return res.render('admin/order/list', {
        admin,
        currentSite: AdminNavBar.ORDER,
        orders: orderPage.data, 
        meta: orderPage.meta, 
        query: pageOptions,
        formatDate,
      });
    },
  );
}
