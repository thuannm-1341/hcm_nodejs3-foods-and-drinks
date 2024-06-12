import { UserEntity } from '../entities/user.entity';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, Role } from '../constants';
import { AdminEntity } from '../entities/admin.entity';
export class AuthService {
  constructor(){}

  public createJwt(user: UserEntity | AdminEntity): string {
    const role = (user instanceof AdminEntity)? Role.ADMIN : Role.USER;
    return jwt.sign({
        id: user.id,
        role: role,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRE},
    );
  }
}
