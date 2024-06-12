import { IsNumber } from 'class-validator';
import { IsValidStoreId } from '../../decorators';
import { Error } from '../../constants';

export class UpdateOrderStoreDto {
  @IsNumber()
  orderId: number;

  @IsValidStoreId({ message: Error.STORE_NOT_FOUND })
  storeId: number;
}
