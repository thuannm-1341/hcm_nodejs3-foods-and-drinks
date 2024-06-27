import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { AppDataSource } from '../config/ormConfig';
import { CategoryPageOptions } from '../commons/dtos/categoryPageOption.dto';
import { PageDto } from '../commons/dtos/page.dto';
import { PageMetaDto } from '../commons/dtos/pageMeta.dto';
import { CreateCategoryDto } from '../commons/dtos/createCategory.dto';
import { Error } from '../constants';
import { ProductEntity } from '../entities/product.entity';

export class CategoryService {
  private readonly categoryRepository: Repository<CategoryEntity>;
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(CategoryEntity);
  }

  public async findOneById(id: number)
  :Promise<CategoryEntity | null> {
    return this.categoryRepository.findOne({where: {id: id}});
  }

  public async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async getCategoryPage(pageOptionsDto: CategoryPageOptions)
  : Promise<PageDto<CategoryEntity>> {
    const {
      order,
      take,
      skip,
      keyword,
    } = pageOptionsDto;
    const query = this.categoryRepository.createQueryBuilder('category');
    // Handle filter
    if(keyword){
      query.andWhere(
        'MATCH(category.name) AGAINST(:keyword IN BOOLEAN MODE)',
        { keyword: `*${keyword}*` },
      );
    }
    // Handle sort
    query.orderBy('category.id', order);

    // Handle paging
    query.skip(skip).take(take);

    // Retrieve entities
    const itemCount = await query.getCount();
    const entities = await query.getMany();

    const pageMeta = new PageMetaDto({pageOptionsDto, itemCount});
    return new PageDto(entities, pageMeta);
  }

  public async createCategory(createOption: CreateCategoryDto)
  : Promise<CategoryEntity> {
    const newCategory = this.categoryRepository.create(createOption);
    return this.categoryRepository.save(newCategory);
  }

  public async updateCategory(
    category: CategoryEntity, 
    updateOption: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    this.categoryRepository.merge(category, updateOption);
    return this.categoryRepository.save(category);
  }

  public async deleteCategory(id: number): Promise<void> {
    const categoryProductNumber = await this.getCategoryProductNumber(id);
    if(categoryProductNumber > 0){
      throw Error.CANNOT_DELETE_CATEGORY;
    }
    await this.categoryRepository.delete({id: id});
  }

  public async getCategoryProductNumber(id: number): Promise<number> {
    const query = AppDataSource.getRepository(ProductEntity)
    .createQueryBuilder('product')
    .leftJoin('product.categories', 'category')
    .where('category.id = :categoryId', {categoryId: id});
    return query.getCount();
  }
}
