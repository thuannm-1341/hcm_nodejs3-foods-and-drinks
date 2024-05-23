import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { REGISTER_FIELD_MIN_LENGTH } from '../../constants';
export class RegisterDto {
  @IsNotEmpty({ message: 'error.userName.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.userName.minLength' })
  userName: string;

  @IsNotEmpty({ message: 'error.password.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.password.minLength' })
  password: string;

  @IsNotEmpty({ message: 'error.email.notEmpty' })
  @IsEmail({}, { message: 'error.email.notEmail' })
  email: string;

  @IsNotEmpty({ message: 'error.fullName.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.fullName.minLength' })
  fullName: string;
}
