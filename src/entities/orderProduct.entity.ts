import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('order_product')
export class OrderProductEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  product: ProductEntity;
}
