import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';
import { Error } from '../constants';

export class ProductController {
  private readonly productService: ProductService;
  constructor(){
    this.productService = new ProductService();
  }
  
  public getHomePage = asyncHandler(
    async (req: Request, res: Response) => {
      const data = await this.productService.getAllProductsByCategory();
      const newProduct = await this.productService.getNewProduct();
      const discountProduct = await this.productService.getDiscountProduct();
      return res.render('user/home', {newProduct, discountProduct, data});
    },
  );

  public getProductDetail = asyncHandler(
    async (req: Request, res: Response) => {
      const product = await this.getProductFromIdParam(req, res);
      if(product === null) {
        req.flash('error', Error.PRODUCT_NOT_FOUND);
        res.redirect('/');
      }
      return res.render('user/product/detail', {product});
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
}
