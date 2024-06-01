import { SessionData } from 'express-session';
import { UserEntity } from '../entities/user.entity';

export interface CustomSessionData extends SessionData {
  user?: UserEntity;
}
