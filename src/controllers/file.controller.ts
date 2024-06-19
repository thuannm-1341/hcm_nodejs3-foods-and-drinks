import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { uploadImage } from '../third-party-services/cloudinary.service';
import { fileUploadMiddleware } from '../middlewares/multer.middleware';
import { t } from 'i18next';
export class FileController {
  constructor() {}

  uploadfilePost = [
    fileUploadMiddleware,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        res.status(400).send({
          success: false,
          message: t('error.file.noFile'),
        });
      } else {
        try {
          const uploadResult = await uploadImage(
            req.file.buffer,
            req.file.originalname, // Use the original file name or generate a unique name
          );
          res.status(200).json({
            message: t('file.uploadSuccessfully'),
            url: uploadResult,
          });
        } catch (error) {
          next(error); // Pass the error to the next middleware
        }
      }
    }),
  ];
}
