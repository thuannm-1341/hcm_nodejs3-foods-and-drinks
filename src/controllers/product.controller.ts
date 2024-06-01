import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';
import { Error, ProductSortField } from '../constants';
import { plainToClass } from 'class-transformer';
import { ProductPageOptions } from '../commons/dtos/productPageOptions.dto';
import { validate } from 'class-validator';
import { handleError } from '../commons/utils';
import { CustomSessionData } from '../interfaces/session.interface';

export class ProductController {
  private readonly productService: ProductService;
  constructor(){
    this.productService = new ProductService();
  }
  
  public getHomePage = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      const data = await this.productService.getAllProductsByCategory();
      const newProduct = await this.productService.getNewProduct();
      const discountProduct = await this.productService.getDiscountProduct();
      return res.render('user/home', {user, newProduct, discountProduct, data});
    },
  );

  public getProductDetail = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      const product = await this.getProductFromIdParam(req, res);
      if(product === null) {
        req.flash('error', Error.PRODUCT_NOT_FOUND);
        res.redirect('/');
      }
      return res.render('user/product/detail', {user, product});
    },
  );

  private getProductFromIdParam = async (
    req: Request,
    res: Response,
  ): Promise<ProductEntity | null> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'error.invalidParameter');
      res.redirect('/');
    }
    return await this.productService.getProductDetail(id);
  };

  public getUserProductPage = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      const pageOptions = plainToClass(ProductPageOptions, req.query);
      const rawErrors = await validate(pageOptions);
      const categories = await this.productService.getAllCategories();
      if( rawErrors.length > 0 ){
        const errors = handleError(rawErrors, req, res);
        return res.render('user/product/search', {
          user,
          categories,
          sortField: ProductSortField,
          errors, 
          query: pageOptions,
        });
      }
      const productPage = await this.productService.getProductPage(pageOptions);
      return res.render('user/product/search', {
        user,
        categories,
        sortField: ProductSortField,
        products: productPage.data, 
        meta: productPage.meta, 
        query: pageOptions,
      });
    },
  );
}
