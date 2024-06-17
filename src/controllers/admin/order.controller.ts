import { StoreService } from './../../services/store.service';
import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import { OrderService } from '../../services/order.service';
import { CustomSessionData } from '../../interfaces/session.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { OrderPageOptions } from '../../commons/dtos/orderPageOptions.dto';
import { formatCurrency, formatDate, handleError } from '../../commons/utils';
import { AdminNavBar } from '../../constants/admin';
import { PaymentService } from '../../services/payment.service';
import { UpdateOrderStatusDto } from '../../commons/dtos/updateOrderStatus.dto';
import { t } from 'i18next';
import { Error } from '../../constants';
import { UpdateOrderStoreDto } from '../../commons/dtos/updateOrderStore.dto';

export class AdminOrderController {
  private readonly orderService: OrderService;
  private readonly paymentService: PaymentService;
  private readonly storeService: StoreService;
  constructor(){
    this.orderService = new OrderService();
    this.paymentService = new PaymentService();
    this.storeService = new StoreService();
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
        formatCurrency,
      });
    },
  );

  public getOrderDetail = asyncHandler(
    async(req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      if(admin!==undefined){
        const id = parseInt(req.params.id);
        const order = await this.orderService.getOrderById(id);
        if(order === null){
          return res.render('errors/404');
        }
        const stores = await this.storeService.getAllStores();
        const payment = await this.paymentService.findOrderPayment(id);
        return res.render('admin/order/detail', {
          currentSite: AdminNavBar.ORDER, 
          admin, 
          order,
          payment,
          stores,
          formatDate,
          formatCurrency,
        });
      }else{
        return res.redirect('/auth/admin-login');
      }
    },
  );

  public updateOrderStatus = asyncHandler(
    async(req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      if(admin!==undefined){
        const updateOptions = plainToClass(UpdateOrderStatusDto, req.body);
        const rawErrors = await validate(updateOptions);
        if( rawErrors.length > 0 ){
          res.status(400).send({
            success: false,
            message: t(Error.BAD_INPUT),
          });
        } else {
          try {
            await this.orderService.updateOrderStatus(updateOptions);
          } catch (error) {
            res.status(200).send({ 
              success: true, 
              message: t('order.update.success'), 
            });
          }
        }
      }else{
        return res.redirect('/auth/admin-login');
      }
    },
  );

  public updateOrderStore = asyncHandler(
    async(req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      if(admin!==undefined){
        const updateOptions = plainToClass(UpdateOrderStoreDto, req.body);
        const rawErrors = await validate(updateOptions);
        if( rawErrors.length > 0 ){
          res.status(400).send({
            success: false,
            message: t(Error.BAD_INPUT),
          });
        } else {
          try {
            await this.orderService.updateOrderStore(updateOptions);
            res.status(200).send({ 
              success: true, 
              message: t('order.update.success'), 
            });
          } catch (error) {
            res.status(400).send({
            success: false,
            message: t(Error.BAD_INPUT),
          });
          }
        }
      }else{
        return res.redirect('/auth/admin-login');
      }
    },
  );
}
