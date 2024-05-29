import { Column, Entity, ManyToMany } from 'typeorm';
import { EntityPropertyLength } from '../constants';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: EntityPropertyLength.MEDIUM })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
