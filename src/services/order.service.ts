import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { EntityManager, Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { OrderEntity } from '../entities/order.entity';
import { CartProductEntity } from '../entities/cartProduct.entity';
import { 
  Error as OrderError,   
  OrderType, 
  PaymentStatus, 
  PaymentType, 
  SHIPPING_FEE,
} from '../constants';
import { CreateOrderDto } from '../commons/dtos/createOrder.dto';
import { StoreService } from './store.service';
import { UserEntity } from '../entities/user.entity';
import { OrderProductEntity } from '../entities/orderProduct.entity';
import { PaymentService } from './payment.service';
import { 
  VnpayReturnUrlQueryDto, 
} from '../commons/dtos/vnpayReturnUrlQuery.dto';
import { PaymentEntity } from '../entities/payment.entity';
import { processPayment } from '../commons/utils';
export class OrderService {
  private readonly orderRepository: Repository<OrderEntity>;
  private readonly orderProductRepository: Repository<OrderProductEntity>;
  private readonly storeService: StoreService;
  private readonly cartService: CartService;
  private readonly paymentService: PaymentService;
  constructor() {
    this.orderRepository = AppDataSource.getRepository(OrderEntity);
    this.orderProductRepository = 
      AppDataSource.getRepository(OrderProductEntity);
    this.storeService = new StoreService();
    this.cartService = new CartService();
    this.paymentService = new PaymentService();
  }

  public async createOrder(
    req: Request,
    res: Response,
    user: UserEntity, 
    createOptions: CreateOrderDto,
  ) {
    const cartProducts = await this.cartService.getCartProducts(user);
    const orderTotal = this.calculateOrderTotal(
      cartProducts, 
      createOptions.orderType === OrderType.PICK_UP,
    );
    await AppDataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
    const newOrder = this.orderRepository.create({
      orderType: createOptions.orderType,
      paymentType: createOptions.paymentType,
      deliveryAddress: createOptions.address,
      note: createOptions.note,
      total: orderTotal,
      user,
    });

    if(createOptions.storeId){
      const store = await this.storeService.findOneById(createOptions.storeId);
      if(store) {
        newOrder.store = store;
        newOrder.deliveryAddress = store.address;
      }
    }

    const savedOrder = await transactionalEntityManager.save(newOrder);
    
    const orderProducts = cartProducts.map((cartProduct) => {
      return this.orderProductRepository.create({
        quantity: cartProduct.quantity,
        price: cartProduct.product.currentPrice,
        product: cartProduct.product,
        order: savedOrder,
      });
    });

    await transactionalEntityManager
    .insert(this.orderProductRepository.target, orderProducts);

    // Remove products from cart
    await this.cartService.removeProductFromCart(user);

    switch(savedOrder.paymentType) {
      case PaymentType.VNPAY: {
        processPayment(req, res, savedOrder);
        break;
      }
      default: {
        res.render('user/order/thank-you', { user });
      }
    }
  }).catch((error) => {
    throw new Error('Transaction failed: ' + (error as Error).message);
  });
  }

  public calculateOrderTotal(
    items: CartProductEntity[], 
    isPickupOrder: boolean,
  ): number {
    let value: number = 0;
    items.forEach((item) => {
      value += item.product.currentPrice * item.quantity;
    });
    return isPickupOrder ? value : value + SHIPPING_FEE;
  }

  public async saveOrderTransaction(
    vnPayResponse: VnpayReturnUrlQueryDto,
  ): Promise<string | PaymentEntity> {
    const order = await this.findOneById(vnPayResponse.vnp_TxnRef);
    if (order === null) {
      return OrderError.ORDER_NOT_FOUND;
    }
    if (order.paymentStatus === PaymentStatus.COMPLETE) {
      return OrderError.ORDER_HAS_BEEN_PAID;
    }
    const saveResult = 
      await this.paymentService.saveTransaction(order, vnPayResponse);
    if(saveResult instanceof PaymentEntity){
      order.paymentStatus = PaymentStatus.COMPLETE;
      await this.orderRepository.save(order);
    }
    return saveResult;
  }

  public async findOneById(id: number | string): Promise<OrderEntity | null> {
    const orderId = (typeof id === 'number') ? id : parseInt(id);
    return this.orderRepository.findOne({where: {id: orderId}});
  }
}
