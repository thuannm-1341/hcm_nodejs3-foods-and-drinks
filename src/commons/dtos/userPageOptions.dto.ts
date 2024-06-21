import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from './pageOptions.dto';
import { Transform } from 'class-transformer';

export class UserPageOptions extends PageOptionsDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @Transform(
    ({ value }) => value === 'true' ? true : value === 'false' ? false : undefined
  )
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
