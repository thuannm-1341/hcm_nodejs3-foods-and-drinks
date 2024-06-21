import { FeedbackEntity } from '../../entities/feedback.entity';
import { ProductEntity } from '../../entities/product.entity';
import { UserEntity } from '../../entities/user.entity';

export class UserProductFeedbackDto {
  user: UserEntity;

  product: ProductEntity;

  feedback: FeedbackEntity | null;

  constructor(
    user: UserEntity,
    product: ProductEntity,
    feedback: FeedbackEntity | null,
  ) {
    this.user = user;
    this.product = product;
    this.feedback = feedback;
  }
}
