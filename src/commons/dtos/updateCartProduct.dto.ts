import { IsNumberString } from 'class-validator';

export class UpdateCartProductDto {
  @IsNumberString()
  id: number;

  @IsNumberString()
  quantity: number;
}
