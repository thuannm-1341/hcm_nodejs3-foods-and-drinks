import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFeedbackTable1718959627092 implements MigrationInterface {
    name = 'UpdateFeedbackTable1718959627092';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `feedback` ADD `userId` int NULL');
        await queryRunner.query('ALTER TABLE `feedback` ADD `productId` int NULL');
        await queryRunner.query('ALTER TABLE `feedback` ADD CONSTRAINT `FK_4a39e6ac0cecdf18307a365cf3c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `feedback` ADD CONSTRAINT `FK_9712ff88f01fdcbf5af09d5b644` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `feedback` DROP FOREIGN KEY `FK_9712ff88f01fdcbf5af09d5b644`');
        await queryRunner.query('ALTER TABLE `feedback` DROP FOREIGN KEY `FK_4a39e6ac0cecdf18307a365cf3c`');
        await queryRunner.query('ALTER TABLE `feedback` DROP COLUMN `productId`');
        await queryRunner.query('ALTER TABLE `feedback` DROP COLUMN `userId`');
    }

}
