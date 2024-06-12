import { CategoryEntity } from './../entities/category.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { ProductEntity } from '../entities/product.entity';
import { ProductsByCategoryDto } from '../commons/dtos/productsByCategory.dto';
import { NUM_OF_PRODUCT_CARD } from '../constants';
import { ProductPageOptions } from '../commons/dtos/productPageOptions.dto';
import { PageDto } from '../commons/dtos/page.dto';
import { PageMetaDto } from '../commons/dtos/pageMeta.dto';

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
        categoryId: category.id,
        products: products,
      };
      result.push(item);
    }
    return result;
  }

  public async getProductDetail(id: number): Promise<ProductEntity | null> {
    return await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: ['categories'],
    });
  }
  
  public async getProductPage(pageOptionsDto: ProductPageOptions) 
  :Promise<PageDto<ProductEntity>> {
    const {
      order,
      take, 
      skip,
      sortField, 
      keyword, 
      rating, 
      categoryIds, 
      minPrice, 
      maxPrice,
    } = pageOptionsDto;
    const query = this.productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.categories', 'category');
    
    // Handle filter
    if(categoryIds && categoryIds.length > 0) {
      const categoryIdParams = 
        Array.isArray(categoryIds)? categoryIds : [categoryIds];
      query.andWhere('category.id IN (:...categoryIds)', 
        {categoryIds: categoryIdParams},
      );
    }
    if(minPrice) {
      query.andWhere('product.currentPrice >= :minPrice', 
        {minPrice: minPrice},
      );
    }
    if(maxPrice) {
      query.andWhere('product.currentPrice <= :maxPrice', 
        {maxPrice: maxPrice},
      );
    }
    if(rating) {
      query.andWhere('product.averageRating >= :rating', 
        {rating: rating},
      );
    }
    if(keyword){
      query.andWhere('MATCH(product.name) AGAINST( :keyword IN BOOLEAN MODE)',
       {keyword: keyword},
      );
    }
    //Handle sort
    query.orderBy('product.' + sortField, order)
    .addOrderBy('product.id', 'DESC');

    //Handle paging
    query.skip(skip).take(take);

    // Retrieve entities
    const itemCount = await query.getCount();
    const entities = await query.getMany();

    const pageMeta = new PageMetaDto({pageOptionsDto, itemCount});
    return new PageDto(entities, pageMeta);
  }

  public getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
