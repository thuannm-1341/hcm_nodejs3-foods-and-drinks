import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStoreTable1718875410469 implements MigrationInterface {
    name = 'UpdateStoreTable1718875410469';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE FULLTEXT INDEX `IDX_66df34da7fb037e24fc7fee642` ON `store` (`name`) WITH PARSER ngram');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `IDX_66df34da7fb037e24fc7fee642` ON `store`');
    }

}
