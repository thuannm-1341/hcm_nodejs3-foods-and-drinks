import { Repository } from "typeorm";
import { AdminEntity } from "../entities/admin.entity";
import { AppDataSource } from "../config/ormConfig";
import { LoginDto } from "../commons/dtos/login.dto";
import { Error } from "../constants";
import bcryptjs from 'bcryptjs';

export class AdminService {
  private readonly adminRepository: Repository<AdminEntity>;
  constructor() {
    this.adminRepository = AppDataSource.getRepository(AdminEntity);
  }

  public async adminLogin(loginDto: LoginDto): Promise<string | AdminEntity> {
    const admin = await this.adminRepository.findOne({
      where: [
        { userName: loginDto.userName },
        { email: loginDto.userName },
      ],
    });
    if (admin===null){
      return Error.INVALID_CREDENTIAL;
    }
    const isMatch = 
      await bcryptjs.compare(loginDto.password, admin.password);
    if (!isMatch) {
      return Error.INVALID_CREDENTIAL;
    }
    return admin;
  }

  public async findById(id: number): Promise<AdminEntity | null> {
    return this.adminRepository.findOne({where: {id: id}});
  }
}
