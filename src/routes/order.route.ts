import { OrderController } from './../controllers/order.controller';
import { Router } from 'express';
const orderRoute: Router = Router();
const orderController = new OrderController();

orderRoute.get('/create', orderController.createOrderGet);
orderRoute.post('/create', orderController.createOrderPost);

orderRoute.get('/thank-you', orderController.thankYouPageGet);

export default orderRoute;
