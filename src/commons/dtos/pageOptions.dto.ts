import {
  DEFAULT_PAGE_TAKE,
  MAX_PAGE_TAKE,
  MIN_PAGE_INDEX,
  MIN_PAGE_TAKE,
  Order,
} from '../../constants';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { GreaterThanOrEqual, LessThanOrEqual } from '../../decorators';

export class PageOptionsDto {
  @IsEnum(Order, { message: 'error.enumNotMatch.order' })
  order: Order = Order.ASC;

  @IsNotEmpty({ message: 'error.page.emptyIndexValue' })
  @GreaterThanOrEqual(MIN_PAGE_INDEX, { message: 'error.page.minIndexValue' })
  page: number = MIN_PAGE_INDEX;

  @IsNotEmpty({ message: 'error.page.emptyTakeValue' })
  @GreaterThanOrEqual(MIN_PAGE_TAKE, { message: 'error.page.minTakeValue' })
  @LessThanOrEqual(MAX_PAGE_TAKE, { message: 'error.page.maxTakeValue' })
  take: number = DEFAULT_PAGE_TAKE;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
