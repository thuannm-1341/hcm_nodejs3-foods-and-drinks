import { IsValidStoreId } from '../../decorators';
import { CreateStoreDto } from './createStore.dto';

export class UpdateStoreDto extends CreateStoreDto {
  @IsValidStoreId()
  id: number;
}
