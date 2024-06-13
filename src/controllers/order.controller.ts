import { CartService } from './../services/cart.service';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CustomSessionData } from '../interfaces/session.interface';
import { StoreService } from '../services/store.service';
import { OrderService } from '../services/order.service';
import { SHIPPING_FEE } from '../constants';
import { plainToClass } from 'class-transformer';
import { CreateOrderDto } from '../commons/dtos/createOrder.dto';
import { 
  VnpayReturnUrlQueryDto,
} from '../commons/dtos/vnpayReturnUrlQuery.dto';
import { formatDate, handleError } from '../commons/utils';
import { validate } from 'class-validator';
import { OrderPageOptions } from '../commons/dtos/orderPageOptions.dto';
import { UserNavBar } from '../constants/user';

export class OrderController {
  private readonly orderService: OrderService;
  private readonly storeService: StoreService;
  private readonly cartService: CartService;
  constructor(){
    this.orderService = new OrderService();
    this.storeService = new StoreService();
    this.cartService = new CartService();
  }

  public createOrderGet = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user!==undefined){
        const products = await this.cartService.getCartProducts(user);
        const stores = await this.storeService.getAllStores();
        const orderSubtotal = this.orderService
          .calculateOrderTotal(products, true);
        return res.render('user/order/create', {
          orderSubtotal,
          user,
          products, 
          stores, 
          shippingFee: SHIPPING_FEE,
        });
      }else{
        return res.redirect('/auth/login');
      }
    },
  );
  
  public createOrderPost = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user!==undefined){
        const createOptions = plainToClass(CreateOrderDto, req.body);
        const rawErrors = await validate(createOptions);
        if(rawErrors.length > 0) {
          const errors = handleError(rawErrors, req, res);
          const products = await this.cartService.getCartProducts(user);
          const stores = await this.storeService.getAllStores();
          const orderSubtotal = this.orderService
            .calculateOrderTotal(products, true);
          return res.render('user/order/create', {
            errors: errors,
            data: createOptions,
            orderSubtotal,
            user,
            products, 
            stores, 
            shippingFee: SHIPPING_FEE,
          });
        }
        try{
          await this.orderService
        .createOrder(req, res, user, createOptions);
        } catch (error) {
          res.status(500).send({ message: error.message });
        }

      }else{
        return res.redirect('/auth/login');
      }
    },
  );

  public thankYouPageGet = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      const paymentInfo = plainToClass(VnpayReturnUrlQueryDto, req.query);
      await this.orderService.saveOrderTransaction(paymentInfo);
      res.render('user/order/thank-you', {user, paymentInfo});
    },
  );

  public getUserOrderPage = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user!==undefined){
        const pageOptions = plainToClass(OrderPageOptions, req.query);
        pageOptions.userId = user.id;
        const rawErrors = await validate(pageOptions);
        if( rawErrors.length > 0 ){
          const errors = handleError(rawErrors, req, res);
          return res.render('user/order/list', {
            user,
            currentSite: UserNavBar.ORDER,
            errors, 
            query: pageOptions,
          });
        }
        const orderPage = await this.orderService.getOrderPage(pageOptions);
        return res.render('user/order/list', {
          user,
          currentSite: UserNavBar.ORDER,
          orders: orderPage.data, 
          meta: orderPage.meta, 
          query: pageOptions,
          formatDate,
        });
      } else {
        return res.redirect('/auth/login');
      }
    },
  );
}
