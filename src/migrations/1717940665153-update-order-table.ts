import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrderTable1717940665153 implements MigrationInterface {
    name = 'UpdateOrderTable1717940665153';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `order` DROP COLUMN `payment_type`');
        await queryRunner.query('ALTER TABLE `order` ADD `payment_type` varchar(30) NOT NULL DEFAULT \'COD\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `order` DROP COLUMN `payment_type`');
        await queryRunner.query('ALTER TABLE `order` ADD `payment_type` enum (\'ONLINE\', \'COD\') NOT NULL DEFAULT \'COD\'');
    }

}
