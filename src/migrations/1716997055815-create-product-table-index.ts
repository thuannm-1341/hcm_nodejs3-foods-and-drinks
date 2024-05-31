import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTableIndex1716997055815
  implements MigrationInterface
{
  name = 'CreateProductTableIndex1716997055815';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE FULLTEXT INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product` (`name`) WITH PARSER ngram',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`',
    );
  }
}
