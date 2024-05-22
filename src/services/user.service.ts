import { RegisterDto } from './../commons/dtos/register.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AppDataSource } from '../config/ormConfig';
import { Error } from '../constants';
import bcryptjs from 'bcryptjs';

export class UserService {
  private readonly userRepository: Repository<UserEntity>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  public async registerUser(registerDto: RegisterDto): Promise<any | UserEntity> {
    let errors: any = {};
    //check duplicate userName
    const findByUserNameResult = await this.userRepository.findOne({
      where: {
        userName: registerDto.userName,
      },
    });
    if (findByUserNameResult!==null){
      errors.userName = Error.DUPLICATE_USER_NAME;
    }
    const findByEmailResult = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
      },
    });
    if (findByEmailResult!==null){
      errors.email = Error.DUPLICATE_EMAIL;
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    const salt = await bcryptjs.genSalt(10); // Generate a salt
    // Hash the password with the generated salt
    const hashedPassword = await bcryptjs.hash(registerDto.password, salt);
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
}
