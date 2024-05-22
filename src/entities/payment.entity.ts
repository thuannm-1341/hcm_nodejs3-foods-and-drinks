import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { EntityPropertyLength } from '../constants';
import { BaseEntity } from './base.entity';

@Entity('payment')
export class PaymentEntity extends BaseEntity {
  @Column({
    name: 'transaction_time',
  })
  transactionTime: Date;

  @Column({ name: 'bank_code', length: EntityPropertyLength.SMALL })
  bankCode: string;

  @Column({ name: 'transaction_code', length: EntityPropertyLength.MEDIUM })
  transactionCode: string;

  @Column({ length: EntityPropertyLength.EXTRA_LARGE })
  message: string;

  @Column({ type: 'int', unsigned: true })
  amount: number;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;
}
