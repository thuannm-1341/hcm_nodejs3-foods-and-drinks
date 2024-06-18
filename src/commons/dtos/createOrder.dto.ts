import { IsEnum, IsNumberString, IsOptional, MinLength } from 'class-validator';
import { 
  Error, 
  MIN_ADDRESS_LENGTH, 
  OrderType, 
  PaymentType, 
} from '../../constants';
import { IsValidOrderAddress, IsValidStoreId } from '../../decorators';

export class CreateOrderDto {
  @IsEnum(OrderType, { message: Error.INVALID_ORDER_TYPE })
  orderType: OrderType;

  @IsEnum(PaymentType, { message: Error.INVALID_PAYMENT_TYPE })
  paymentType: PaymentType;

  @IsNumberString()
  @MinLength(10, { message: Error.PHONE_NUMBER_MIN_LENGTH })
  phoneNumber: string;

  @IsOptional()
  @IsValidOrderAddress(
    MIN_ADDRESS_LENGTH, 
    { message: Error.ADDRESS_MIN_LENGTH },
  )
  address?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  @IsValidStoreId({message: Error.STORE_NOT_FOUND})
  storeId?: number;
};
