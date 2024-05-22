import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import { CategoryEntity } from '../entities/category.entity';

export default class CategorySeeder implements Seeder {
  async run(dataSource: DataSource) {
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    await categoryRepository.insert([
      {
        name: 'COMBO 1 NGƯỜI',
      },
      {
        name: 'COMBO NHÓM',
      },
      {
        name: 'GÀ RÁN - GÀ QUAY',
      },
      {
        name: 'BURGER - CƠM - MÌ Ý',
      },
      {
        name: 'THỨC ĂN NHẸ',
      },
      {
        name: 'THỨC UỐNG & TRÁNG MIỆNG',
      },
    ]);
  }
}
