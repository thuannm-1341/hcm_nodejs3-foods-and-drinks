import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { CustomSessionData } from '../interfaces/session.interface';
import { t } from 'i18next';
import { plainToClass } from 'class-transformer';
import { UpdateCartProductDto } from '../commons/dtos/updateCartProduct.dto';
import { validate } from 'class-validator';
import { formatCurrency, handleError } from '../commons/utils';

export class CartController {
  private readonly cartService: CartService;
  constructor(){
    this.cartService = new CartService();
  }
  
  public addToCart = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      const productId = Number(req.body?.productId);
      if(user!==undefined){
        try {
          await this.cartService.addToCart(user, productId);
          res.status(200).send({ 
            success: true, 
            message: t('cart.add.success'), 
          });
        } catch (error) {
          res.status(500).send({ 
            success: false, 
            message: t('cart.add.fail'), 
          });
        }
      }else{
        return res.redirect('/auth/login');
      }
    },
  );

  public viewCart = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user!=undefined) {
        const products = await this.cartService.getCartProducts(user);
        const totalValue = this.cartService.orderValue(products, 0);
        return res.render('user/cart', {
          user, 
          cartItem: (req.session as CustomSessionData).cartItem,
          products, 
          totalValue, 
          formatCurrency,
        });
      }else{
        return res.redirect('/auth/login');
      }
    },
  );

  public updateCart = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user!=undefined) {
        const updateOptions = plainToClass(UpdateCartProductDto, req.body);
        const rawErrors = await validate(updateOptions);
        const products = await this.cartService.getCartProducts(user);
        const totalValue = this.cartService.orderValue(products, 0);
        if(rawErrors.length > 0) {
          const errors = handleError(rawErrors, req, res);
          return res.render('user/cart', {
            user, 
            cartItem: (req.session as CustomSessionData).cartItem,
            errors, 
            products, 
            totalValue,
            formatCurrency,
          });
        }
        await this.cartService.updateCartProduct(
          updateOptions.id, 
          updateOptions.quantity,
        );
        res.redirect('/cart');
      }else{
        return res.redirect('/auth/login');
      }
    },
  );
}
