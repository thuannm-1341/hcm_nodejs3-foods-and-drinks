import { IsNotEmpty, MinLength } from 'class-validator';
import { REGISTER_FIELD_MIN_LENGTH } from '../../constants';
export class LoginDto {
  @IsNotEmpty({ message: 'error.userName.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.userName.minLength' })
  userName: string;

  @IsNotEmpty({ message: 'error.password.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.password.minLength' })
  password: string;
}
