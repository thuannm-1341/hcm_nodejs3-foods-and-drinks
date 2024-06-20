import { OrderService } from './../../services/order.service';
import asyncHandler from 'express-async-handler';
import {Request, Response} from 'express';
import { CustomSessionData } from '../../interfaces/session.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { handleError } from '../../commons/utils';
import { AdminNavBar } from '../../constants/admin';
import { StoreService } from '../../services/store.service';
import { StorePageOptions } from '../../commons/dtos/storeOptions.dto';
import { CreateStoreDto } from '../../commons/dtos/createStore.dto';
import { StoreEntity } from '../../entities/store.entity';
import { t } from 'i18next';
import { UpdateStoreDto } from '../../commons/dtos/updateStore.dto';
import { Error } from '../../constants';

export class AdminStoreController {
  private readonly storeService: StoreService;
  private readonly orderService: OrderService;
  constructor() {
    this.storeService = new StoreService();
    this.orderService = new OrderService();
  }

  public getAdminStorePage = asyncHandler(
    async (req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      const pageOptions = plainToClass(StorePageOptions, req.query);
      const rawErrors = await validate(pageOptions);
      if(rawErrors.length > 0) {
        const errors = handleError(rawErrors, req, res);
        return res.render('admin/store/list', {
          admin,
          currentSite: AdminNavBar.STORE,
          errors,
          query: pageOptions,
        });
      }
      const storePage = await this.storeService.getStorePage(pageOptions);
      return res.render('admin/store/list', {
        admin,
        currentSite: AdminNavBar.STORE,
        stores: storePage.data,
        meta: storePage.meta,
        query: pageOptions,
      });
    },
  );

  public createStorePost = asyncHandler(
    async (req: Request, res: Response) => {
      const createOption = plainToClass(CreateStoreDto, req.body);
      const rawErrors = await validate(createOption);
      if(rawErrors.length > 0) {
        const errors = handleError(rawErrors, req, res);
        res.status(400).send({
          success: false,
          errors,
        });
      } else {
        try {
          const newStore = await this.storeService.createNewStore(createOption);
          if(newStore instanceof StoreEntity) {
            res.status(201).send({
              success:true,
              message: t('store.create.success'),
            });
          }
        } catch (error) {
          res.status(400).send({
            success: false,
            error,
          });
        }
      }
    },
  );

  public updateStore = asyncHandler(
    async (req: Request, res: Response) => {
      const updateOption = plainToClass(UpdateStoreDto, req.body);
      const rawErrors = await validate(updateOption);
      if(rawErrors.length > 0) {
        const errors = handleError(rawErrors, req, res);
        res.status(400).send({
          success: false,
          errors,
        });
      } else {
        try {
          const updatedStore = 
          await this.storeService.updateStore(updateOption);
          if(updatedStore instanceof StoreEntity) {
            res.status(201).send({
              success:true,
              message: t('store.update.success'),
            });
          }
        } catch (error) {
          res.status(400).send({
            success: false,
            error,
          });
        }
      }
    },
  );

  public deleteStore = asyncHandler(
    async (req: Request, res: Response) => {
      const store = await this.getStoreFromIdParam(req, res);
      if(store === null) {
        res.status(400).send({
          success: false,
          message: t(Error.STORE_NOT_FOUND),
        });
      } else {
        const storeOrderNumber = await 
        this.orderService.getStoreOrderNumber(store.id);
        if(storeOrderNumber > 0) {
          res.status(400).send({
            success: false,
            message: t(Error.CANNOT_DELETE_STORE),
          });
        } else {
          try {
            await this.storeService.deleteStore(store.id);
            res.status(200).send({
              success:true,
              message: t('store.delete.success'),
            });
          } catch (error) {
            res.status(400).send({
              success: false,
              error,
            });
          }
        }
      }
    },
  );

  private getStoreFromIdParam = async (
    req: Request,
    res: Response,
  ): Promise<StoreEntity | null> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'error.invalidParameter');
      res.redirect('/admin/store');
    }
    return await this.storeService.findOneById(id);
  };
}
