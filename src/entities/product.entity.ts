import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { EntityPropertyLength } from '../constants';
import { CategoryEntity } from './category.entity';
import { CartProductEntity } from './cartProduct.entity';
import { FeedbackEntity } from './feedback.entity';
import { BaseEntity } from './base.entity';
import { OrderProductEntity } from './orderProduct.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ length: EntityPropertyLength.MEDIUM })
  name: string;

  @Column({ length: EntityPropertyLength.LARGE })
  image: string;

  @Column({ name: 'base_price', default: 0 })
  basePrice: number;

  @Column({ name: 'current_price', default: 0 })
  currentPrice: number;

  @Column({ length: EntityPropertyLength.EXTRA_LARGE })
  description: string;

  @Column({ name: 'average_rating', nullable: true })
  averageRating: number;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'product_category' })
  categories: CategoryEntity[];

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
  cartProducts: CartProductEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.product)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];
}
