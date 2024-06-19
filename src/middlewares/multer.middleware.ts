import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { t } from 'i18next';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error(t('error.file.invalidType')));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
});

export const fileUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  upload.single('file')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: t('error.file.uploadError'),
        error: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: t('error.file.invalidType'),
        error: err.message,
      });
    }
    // Everything went fine.
    next();
  });
};
