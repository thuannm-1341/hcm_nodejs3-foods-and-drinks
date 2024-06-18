import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  EntityPropertyLength,
  PaymentStatus,
  PaymentType,
  OrderStatus,
  OrderType,
} from '../constants';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';
import { BaseEntity } from './base.entity';
import { OrderProductEntity } from './orderProduct.entity';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INCOMPLETE,
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'payment_type',
    length: EntityPropertyLength.SMALL,
    default: PaymentType.COD,
  })
  paymentType: string;

  @Column({
    name: 'delivery_address',
    nullable: true,
    length: EntityPropertyLength.EXTRA_LARGE,
  })
  deliveryAddress: string;

  @Column({
    name: 'order_type',
    type: 'enum',
    enum: OrderType,
    default: OrderType.PICK_UP,
  })
  orderType: OrderType;

  @Column({
    nullable: true,
    length: EntityPropertyLength.EXTRA_LARGE,
  })
  rejectReason?: string;

  @Column({
    nullable: true,
    length: EntityPropertyLength.SMALL,
  })
  phoneNumber?: string;

  @Column({
    nullable: true,
    length: EntityPropertyLength.EXTRA_LARGE,
  })
  note: string;

  @Column({ name: 'shipping_fee', default: 0 })
  shippingFee: number;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.orders)
  store: StoreEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  orderProducts: OrderProductEntity[];
}
