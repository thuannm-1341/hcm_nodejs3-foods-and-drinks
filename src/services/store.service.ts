import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { StoreEntity } from '../entities/store.entity';

export class StoreService {
  private readonly storeRepository: Repository<StoreEntity>;
  constructor() {
    this.storeRepository = AppDataSource.getRepository(StoreEntity);
  }

  public async findOneById(id: number | string): Promise<StoreEntity | null> {
    const storeId = (typeof id === 'number')? id : parseInt(id);
    return this.storeRepository.findOne({where: {id: storeId}});
  }

  public async getAllStores(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }
}
