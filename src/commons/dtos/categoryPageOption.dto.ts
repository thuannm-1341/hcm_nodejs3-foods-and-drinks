import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from './pageOptions.dto';

export class CategoryPageOptions extends PageOptionsDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
