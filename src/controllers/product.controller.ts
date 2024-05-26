import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

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
      res.render('user/home', {newProduct, discountProduct, data});
      return;
    },
  );
}
