import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../../constants';

export class UpdateOrderStatusDto {
  @IsNumberString()
  id: number;

  @IsEnum(OrderStatus, { message: 'error.enumNotMatch.orderStatus' })
  orderStatus: OrderStatus;

  @IsOptional()
  @IsString()
  rejectReason?: string;
}
