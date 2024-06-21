import { Column, Entity, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => UserEntity, (user) => user.feedbacks)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.feedbacks)
  product: ProductEntity;
}
