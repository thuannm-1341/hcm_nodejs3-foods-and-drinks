import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1718855447691 implements MigrationInterface {
    name = 'UpdateUserTable1718855447691';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE FULLTEXT INDEX `IDX_8ce25d9915c83705556d03f178` ON `user` (`user_name`, `email`, `full_name`)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX `IDX_8ce25d9915c83705556d03f178` ON `user`');
    }

}
