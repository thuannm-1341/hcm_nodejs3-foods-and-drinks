import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAdminTable1717990148492 implements MigrationInterface {
    name = 'UpdateAdminTable1717990148492';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `admin` DROP COLUMN `password`');
        await queryRunner.query('ALTER TABLE `admin` ADD `password` varchar(200) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `admin` DROP COLUMN `password`');
        await queryRunner.query('ALTER TABLE `admin` ADD `password` varchar(30) NOT NULL');
    }

}
