import { IsEnum } from 'class-validator';
import { PageOptionsDto } from './pageOptions.dto';
import { 
  ProductSortField, 
} from '../../constants';
import { GreaterThanOrEqual, TransformStringToArray } from '../../decorators';

export class ProductPageOptions extends PageOptionsDto {
  @IsEnum(ProductSortField, { message: 'error.enumNotMatch.productSortField' })
  sortField: ProductSortField = ProductSortField.CREATED_AT;

  keyword?: string;

  rating?: number;

  onSale?: boolean;

  @TransformStringToArray()
  categoryIds?: number[];

  @GreaterThanOrEqual(0, { message: 'error.price.minValue' })
  minPrice?: number;

  @GreaterThanOrEqual(0, { message: 'error.price.minValue' })
  maxPrice?: number;
}
