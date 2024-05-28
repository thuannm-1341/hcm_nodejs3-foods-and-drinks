import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

export class ProductController {
  constructor(){}
  
  public getHomePage = asyncHandler(
    async (req: Request, res: Response) => {
      res.render('user/home');
      return;
    },
  );
}
