import { IsValidCategoryId } from '../../decorators';
import { CreateCategoryDto } from './createCategory.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsValidCategoryId()
  id: number;
}
