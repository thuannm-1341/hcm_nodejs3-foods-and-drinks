import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
const fileRoute: Router = Router();
const fileController = new FileController();

fileRoute.post('/', fileController.uploadfilePost);

export default fileRoute;
