import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from './pageOptions.dto';


export class StorePageOptions extends PageOptionsDto {
  @IsOptional()
  @IsString()
  keyword?: string;
}
