import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import { AdminEntity } from '../entities/admin.entity';
import bcryptjs from 'bcryptjs';

export default class AdminSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const adminRepository = dataSource.getRepository(AdminEntity);
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('12345678', salt);
    await adminRepository.insert([
      {
        userName: 'admin',
        password: hashedPassword,
        email: 'admin@gmail.com',
      },
    ]);
  }
}
