import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductTable1716739360192 implements MigrationInterface {
    name = 'UpdateProductTable1716739360192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`name\``);
    }

}
