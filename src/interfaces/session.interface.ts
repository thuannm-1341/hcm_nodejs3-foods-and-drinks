import { SessionData } from 'express-session';
import { UserEntity } from '../entities/user.entity';
import { AdminEntity } from '../entities/admin.entity';

export interface CustomSessionData extends SessionData {
  user?: UserEntity;
  admin?: AdminEntity;
}
