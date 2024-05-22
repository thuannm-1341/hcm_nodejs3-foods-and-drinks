import { EntityPropertyLength, Gender } from '../constants';
import { Column, Entity, OneToMany } from 'typeorm';
import { CartProductEntity } from './cartProduct.entity';
import { FeedbackEntity } from './feedback.entity';
import { OrderEntity } from './order.entity';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    name: 'user_name',
    length: EntityPropertyLength.MEDIUM,
    unique: true,
  })
  userName: string;

  @Column({ length: EntityPropertyLength.LARGE })
  password: string;

  @Column({ length: EntityPropertyLength.MEDIUM, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @Column({ nullable: true })
  dob: Date;

  @Column({
    name: 'full_name',
    nullable: true,
    length: EntityPropertyLength.MEDIUM,
  })
  fullName: string;

  @Column({ nullable: true, length: EntityPropertyLength.LARGE })
  avatar: string;

  @Column({ nullable: true, length: EntityPropertyLength.LARGE })
  address: string;

  @Column({
    name: 'phone_number',
    nullable: true,
    length: EntityPropertyLength.SMALL,
  })
  phoneNumber: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.user)
  cartProducts: CartProductEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
