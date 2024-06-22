import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CustomSessionData } from '../interfaces/session.interface';
import { StoreService } from '../services/store.service';

export class StoreController {
  private readonly storeService: StoreService;
  constructor(){
    this.storeService = new StoreService();
  }
  
  public getAllStore = asyncHandler(
    async (req: Request, res: Response) => {
      const stores = await this.storeService.getAllStores();
      return res.render('user/store', {
        user: (req.session as CustomSessionData).user,
        cartItem: (req.session as CustomSessionData).cartItem,
        stores, 
      });
    },
  );
}
