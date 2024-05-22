import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';
import { runSeeders } from 'typeorm-extension';
import { CategoryEntity } from '../entities/category.entity';
import CategorySeeder from './category.seeder';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const port = DB_PORT ? parseInt(DB_PORT) : 3306;

async function executeSeeding() {
  const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: port,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [CategoryEntity],
    seeds: [CategorySeeder],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
}

executeSeeding().catch(console.error);
