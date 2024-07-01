import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { REGISTER_FIELD_MIN_LENGTH } from '../../constants';

export class UserUpdateAccountDto {
  @IsOptional()
  @IsNotEmpty({ message: 'error.userName.notEmpty' })
  @MinLength(REGISTER_FIELD_MIN_LENGTH, { message: 'error.userName.minLength' })
  userName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'error.email.notEmpty' })
  @IsEmail({}, { message: 'error.email.notEmail' })
  email?: string;

  @IsString()
  password: string;
}
