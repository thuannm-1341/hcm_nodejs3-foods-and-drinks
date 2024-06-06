import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { AppDataSource } from '../config/ormConfig';
import { OrderEntity } from '../entities/order.entity';
import { 
  VnpayReturnUrlQueryDto,
} from '../commons/dtos/vnpayReturnUrlQuery.dto';
import { Error } from '../constants';

export class PaymentService {
  private readonly paymentRepository: Repository<PaymentEntity>;
  constructor(){
    this.paymentRepository = AppDataSource.getRepository(PaymentEntity);
  }
  
  public async saveTransaction(
    order: OrderEntity, 
    vnPayResponse: VnpayReturnUrlQueryDto,
  ): Promise<string | PaymentEntity> {
    try {
      const newPaymentEntity = this.paymentRepository.create({
        transactionTime: vnPayResponse.vnp_PayDate,
        bankCode: vnPayResponse.vnp_BankCode,
        transactionCode: vnPayResponse.vnp_BankTranNo,
        message: vnPayResponse.vnp_OrderInfo,
        amount: (parseInt(vnPayResponse.vnp_Amount) / 100 ),
        order: order,
      });
      const savedPaymentEntity = await this.paymentRepository
      .save(newPaymentEntity);
      return savedPaymentEntity;
    } catch (error) {
      return Error.SAVE_PAYMENT_FAILED;
    }
  }
}
