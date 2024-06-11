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
import { handleError } from '../commons/utils';
import { validate } from 'class-validator';

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
}
