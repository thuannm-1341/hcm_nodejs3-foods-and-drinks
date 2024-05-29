import { CategoryEntity } from './../entities/category.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { ProductEntity } from '../entities/product.entity';
import { ProductsByCategoryDto } from '../commons/dtos/productsByCategory.dto';
import { NUM_OF_PRODUCT_CARD } from '../constants';

export class ProductService {
  private readonly productRepository: Repository<ProductEntity>;
  private readonly categoryRepository: Repository<CategoryEntity>;
  constructor() {
    this.productRepository = AppDataSource.getRepository(ProductEntity);
    this.categoryRepository = AppDataSource.getRepository(CategoryEntity);
  }

  public async getDiscountProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.createQueryBuilder('products')
    .where('products.basePrice != products.currentPrice').getMany();
  }

  public async getNewProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.createQueryBuilder('products')
    .orderBy('products.id', 'DESC').limit(NUM_OF_PRODUCT_CARD).getMany();
  }

  public async getAllProductsByCategory(): Promise<ProductsByCategoryDto[]> {
    const categories = await this.categoryRepository.createQueryBuilder('category').getMany();
    const result: ProductsByCategoryDto[] = [];
    for(const category of categories) {
      const products = await this.productRepository.createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .where('categories.id = :categoryId', {categoryId: category.id}).getMany();
      const item = {
        category: category.name,
        products: products,
      };
      result.push(item);
    }
    return result;
  }
}
