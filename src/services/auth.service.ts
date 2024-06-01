import { UserEntity } from '../entities/user.entity';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET, Role } from '../constants';
export class AuthService {
  constructor(){}

  public createJwt(user: UserEntity): string {
    return jwt.sign({
        id: user.id,
        role: Role.USER,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRE},
    );
  }
}
