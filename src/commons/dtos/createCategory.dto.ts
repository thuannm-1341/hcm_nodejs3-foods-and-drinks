import { IsString, MinLength, ValidationArguments } from 'class-validator';
import { CATEGORY_MIN_LENGTH, Error } from '../../constants';
import { t } from 'i18next';

export class CreateCategoryDto {
  @IsString()
  @MinLength(CATEGORY_MIN_LENGTH, {
    message: (args: ValidationArguments) =>
      t(Error.CATEGORY_MIN_LENGTH, { length: CATEGORY_MIN_LENGTH }),
  })
  name: string;
}
