import { 
  IsBoolean, 
  IsEnum, 
  IsNumber, 
  IsOptional,
} from 'class-validator';
import { PageOptionsDto } from './pageOptions.dto';
import { FeedbackSortField } from '../../constants';
import { Type } from 'class-transformer';

export class FeedbackPageOptions extends PageOptionsDto {
  @IsEnum(FeedbackSortField, {
    message: 'error.enumNotMatch.feedbackSortField',
  })
  sortField: FeedbackSortField = FeedbackSortField.CREATED_AT;

  @Type(()=>Number)
  @IsNumber()
  productId: number;

  @IsOptional()
  @Type(()=>Number)
  @IsNumber()
  star?: number;

  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  haveImage: boolean = false;

  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  haveContent: boolean = false;
}
