import { ProductEntity } from '../../entities/product.entity';

export type ProductsByCategoryDto = {
  category: string,

  products: ProductEntity[],
};
