import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('cart_product')
export class CartProductEntity extends BaseEntity {
  @Column({ default: 0 })
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.cartProducts)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartProducts)
  product: ProductEntity;
}
