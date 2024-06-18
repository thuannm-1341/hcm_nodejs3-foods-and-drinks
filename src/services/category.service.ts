import { Repository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { AppDataSource } from "../config/ormConfig";

export class CategoryService {
  private readonly categoryRepository: Repository<CategoryEntity>;
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(CategoryEntity);
  }

  public async findOneById(id: number | string)
  :Promise<CategoryEntity | null> {
    const storeId = (typeof id === 'number')? id : parseInt(id);
    return this.categoryRepository.findOne({where: {id: storeId}});
  }
}
