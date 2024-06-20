import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EntityPropertyLength } from '../constants';
import { OrderEntity } from './order.entity';
import { BaseEntity } from './base.entity';

@Entity('store')
export class StoreEntity extends BaseEntity {
  @Column({ length: EntityPropertyLength.MEDIUM })
  @Index({ fulltext: true, parser: 'ngram' })
  name: string;

  @Column({ length: EntityPropertyLength.LARGE })
  address: string;

  @Column({ name: 'phone_number', length: EntityPropertyLength.SMALL })
  phoneNumber: string;

  @OneToMany(() => OrderEntity, (order) => order.store)
  orders: OrderEntity[];
}
