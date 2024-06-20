import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { StoreEntity } from '../entities/store.entity';
import { StorePageOptions } from '../commons/dtos/storeOptions.dto';
import { PageDto } from '../commons/dtos/page.dto';
import { PageMetaDto } from '../commons/dtos/pageMeta.dto';
import { CreateStoreDto } from '../commons/dtos/createStore.dto';
import { UpdateStoreDto } from '../commons/dtos/updateStore.dto';
import { Error } from '../constants';

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

  public async getStorePage(pageOptionsDto: StorePageOptions)
  : Promise<PageDto<StoreEntity>> {
    const {
      order,
      take,
      skip,
      keyword,
    } = pageOptionsDto;
    const query = this.storeRepository.createQueryBuilder('store');
    // Handle filter
    if(keyword){
      query.andWhere(
        'MATCH(store.name) AGAINST(:keyword IN BOOLEAN MODE)',
        { keyword: `*${keyword}*` },
      );
    }
    // Handle sort
    query.orderBy('store.id', order);

    // Handle paging
    query.skip(skip).take(take);

    // Retrieve entities
    const itemCount = await query.getCount();
    const entities = await query.getMany();

    const pageMeta = new PageMetaDto({pageOptionsDto, itemCount});
    return new PageDto(entities, pageMeta);
  }

  public async createNewStore(createOption: CreateStoreDto)
  : Promise<StoreEntity> {
    const newStore = this.storeRepository.create(createOption);
    return this.storeRepository.save(newStore);
  }

  public async updateStore(updateOption: UpdateStoreDto): Promise<StoreEntity> {
    const { id, ...updatedData } = updateOption;
    const store = await this.storeRepository.findOne(
      {where: {id: id }},
    );
    if(store===null){
      throw Error.STORE_NOT_FOUND;
    }
    this.storeRepository.merge(store, updatedData);
    return this.storeRepository.save(store);
  }

  public async deleteStore(id: number): Promise<void> {
    await this.storeRepository.delete({id: id});
  }
}
