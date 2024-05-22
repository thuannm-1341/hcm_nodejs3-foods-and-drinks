import { Column, Entity, OneToMany } from 'typeorm';
import { EntityPropertyLength, FEEDBACK_MAX_STAR } from '../constants';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('feedback')
export class FeedbackEntity extends BaseEntity {
  @Column({ default: FEEDBACK_MAX_STAR })
  star: number;

  @Column({ length: EntityPropertyLength.LARGE })
  image: string;

  @Column({ length: EntityPropertyLength.EXTRA_LARGE })
  content: string;

  @OneToMany(() => UserEntity, (user) => user.feedbacks)
  user: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.feedbacks)
  product: ProductEntity;
}
