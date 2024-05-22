import { Column, Entity } from 'typeorm';
import { EntityPropertyLength } from '../constants';
import { BaseEntity } from './base.entity';

@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ name: 'user_name', length: EntityPropertyLength.MEDIUM })
  userName: string;

  @Column({ length: EntityPropertyLength.SMALL })
  password: string;

  @Column({ length: EntityPropertyLength.MEDIUM })
  email: string;
}
