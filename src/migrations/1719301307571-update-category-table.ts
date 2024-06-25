import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCategoryTable1719301307571 implements MigrationInterface {
    name = 'UpdateCategoryTable1719301307571';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE FULLTEXT INDEX `IDX_23c05c292c439d77b0de816b50` ON `category` (`name`) WITH PARSER ngram');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `IDX_23c05c292c439d77b0de816b50` ON `category`');
    }

}
