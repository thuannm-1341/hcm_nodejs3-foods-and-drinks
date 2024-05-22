import { Column, Entity } from 'typeorm';
import { EntityPropertyLength } from '../constants';
import { BaseEntity } from './base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: EntityPropertyLength.MEDIUM })
  name: string;
}
