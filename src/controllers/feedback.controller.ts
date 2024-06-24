import { createFeedbackDto } from './../commons/dtos/createFeedback.dto';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedback.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { handleError } from '../commons/utils';
import { FeedbackEntity } from '../entities/feedback.entity';
import { t } from 'i18next';
import { FeedbackPageOptions } from '../commons/dtos/feedbackPageOption.dto';
import { CustomSessionData } from '../interfaces/session.interface';
import { updateFeedbackDto } from '../commons/dtos/updateFeedback.dto';

export class FeedbackController {
  private readonly feedbackService: FeedbackService;
  constructor() {
    this.feedbackService = new FeedbackService();
  }

  public createFeedback = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req.session as CustomSessionData).user;
      if(user !== undefined) {
        const createOption = plainToClass(createFeedbackDto, req.body);
        const rawErrors = await validate(createOption);
        if(rawErrors.length > 0) {
          const errors = handleError(rawErrors, req, res);
          res.status(400).send({
            success: false,
            errors,
          });
        } else {
          try {
            const newFeedback = await this.feedbackService
            .createFeedback(createOption, user);
            if(newFeedback instanceof FeedbackEntity) {
              res.status(201).send({
                success: true,
                message: t('feedback.create.success'),
              });
            }
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

  public updateFeedback = asyncHandler(
    async (req: Request, res: Response) => {
      const updateOption = plainToClass(updateFeedbackDto, req.body);
      const rawErrors = await validate(updateOption);
      if(rawErrors.length > 0) {
        const errors = handleError(rawErrors, req, res);
        res.status(400).send({
          success: false,
          errors,
        });
      } else {
        try {
          const updatedFeedback = 
          await this.feedbackService.updateFeedback(updateOption);
          if(updatedFeedback instanceof FeedbackEntity) {
            res.status(200).send({
              success:true,
              message: t('feedback.update.success'),
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
  
  public getProductFeedback = asyncHandler(
    async (req: Request, res: Response) => {
      const pageOptions = plainToClass(FeedbackPageOptions, req.query);
      const rawErrors = await validate(pageOptions);
      if(rawErrors.length > 0) {
        const errors = handleError(rawErrors, req, res);
        res.status(400).send({
          success: false,
          errors,
        });
      } else {
        try {
          const feedbackPage = 
          await this.feedbackService.getFeedbackPage(pageOptions);
          res.status(200).send({
            success:true,
            query: pageOptions,
            feedbacks: feedbackPage.data,
            meta: feedbackPage.meta,
          });
        } catch (error) {
          res.status(400).send({
            success: false,
            error,
          });
        }
      }
    },
  );
}
