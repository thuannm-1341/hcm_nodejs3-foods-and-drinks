import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import { StoreEntity } from '../entities/store.entity';

export default class StoreSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const storeRepository = dataSource.getRepository(StoreEntity);
    await storeRepository.insert([
      {
        name: 'KFC Đường Nguyễn Xí',
        address: '217 Nguyễn Xí, P.13, Bình Thạnh, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
      {
        name: 'KFC Đường Xô Viết Nghệ Tĩnh',
        address: 'Số 195 Xô Viết Nghệ Tĩnh, P.17, Bình Thạnh, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
      {
        name: 'KFC EMART Gò Vấp',
        address:
          'F01-03 Tầng 1, Trung tâm thương mại Emart Gò Vấp, 366 Phan Văn Trị, P5, Gò Vấp, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
      {
        name: 'KFC Giga Mall 2',
        address: '240-242 Kha Vạn Cân, Hiệp Bình Chánh, Thủ Đức, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
      {
        name: 'KFC Nguyễn Văn Giai',
        address: 'Số 2, Nguyễn Huy Tự, Đa Kao, Q1, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
      {
        name: 'KFC Đường Trần Não',
        address: 'Số 72 Đường Trần Não, Bình An, Q2, Hồ Chí Minh',
        phoneNumber: '0123456789',
      },
    ]);
  }
}
