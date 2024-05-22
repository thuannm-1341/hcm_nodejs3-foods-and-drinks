import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1716363742424 implements MigrationInterface {
  name = 'InitDatabase1716363742424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `feedback` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `star` int NOT NULL DEFAULT \'5\', `image` varchar(200) NOT NULL, `content` varchar(1000) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `store` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `address` varchar(200) NOT NULL, `phone_number` varchar(30) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `status` enum (\'PENDING\', \'APPROVED\', \'READY\', \'COMPLETED\', \'REJECTED\') NOT NULL DEFAULT \'PENDING\', `payment_status` enum (\'COMPLETE\', \'INCOMPLETE\') NOT NULL DEFAULT \'INCOMPLETE\', `payment_type` enum (\'ONLINE\', \'COD\') NOT NULL DEFAULT \'COD\', `delivery_address` varchar(1000) NULL, `order_type` enum (\'DELIVERY\', \'PICKUP\') NOT NULL DEFAULT \'PICKUP\', `note` varchar(1000) NULL, `shipping_fee` int NOT NULL DEFAULT \'0\', `total` int NOT NULL DEFAULT \'0\', `userId` int NULL, `storeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `order_product` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `quantity` int NOT NULL, `price` int NOT NULL, `orderId` int NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `image` varchar(50) NOT NULL, `base_price` int NOT NULL DEFAULT \'0\', `current_price` int NOT NULL DEFAULT \'0\', `description` varchar(1000) NOT NULL, `average_rating` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `cart_product` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `quantity` int NOT NULL DEFAULT \'0\', `userId` int NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `user_name` varchar(50) NOT NULL, `password` varchar(30) NOT NULL, `email` varchar(50) NOT NULL, `gender` enum (\'MALE\', \'FEMALE\') NOT NULL DEFAULT \'MALE\', `dob` datetime NULL, `full_name` varchar(50) NULL, `avatar` varchar(200) NULL, `address` varchar(200) NULL, `phone_number` varchar(30) NULL, `is_active` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `payment` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `transaction_time` datetime NOT NULL, `bank_code` varchar(30) NOT NULL, `transaction_code` varchar(50) NOT NULL, `message` varchar(1000) NOT NULL, `amount` int UNSIGNED NOT NULL, `orderId` int NULL, UNIQUE INDEX `REL_d09d285fe1645cd2f0db811e29` (`orderId`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `admin` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `user_name` varchar(50) NOT NULL, `password` varchar(30) NOT NULL, `email` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `product_category` (`productId` int NOT NULL, `categoryId` int NOT NULL, INDEX `IDX_930110e92aed1778939fdbdb30` (`productId`), INDEX `IDX_559e1bc4d01ef1e56d75117ab9` (`categoryId`), PRIMARY KEY (`productId`, `categoryId`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `order` ADD CONSTRAINT `FK_1a79b2f719ecd9f307d62b81093` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `order_product` ADD CONSTRAINT `FK_3fb066240db56c9558a91139431` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `order_product` ADD CONSTRAINT `FK_073c85ed133e05241040bd70f02` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `cart_product` ADD CONSTRAINT `FK_3c7e1dfabf88ee8608e627e253b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `cart_product` ADD CONSTRAINT `FK_4f1b0c66f4e0b4610e14ca42e5c` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `payment` ADD CONSTRAINT `FK_d09d285fe1645cd2f0db811e293` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `product_category` ADD CONSTRAINT `FK_930110e92aed1778939fdbdb302` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE `product_category` ADD CONSTRAINT `FK_559e1bc4d01ef1e56d75117ab9c` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `product_category` DROP FOREIGN KEY `FK_559e1bc4d01ef1e56d75117ab9c`');
    await queryRunner.query('ALTER TABLE `product_category` DROP FOREIGN KEY `FK_930110e92aed1778939fdbdb302`');
    await queryRunner.query('ALTER TABLE `payment` DROP FOREIGN KEY `FK_d09d285fe1645cd2f0db811e293`');
    await queryRunner.query('ALTER TABLE `cart_product` DROP FOREIGN KEY `FK_4f1b0c66f4e0b4610e14ca42e5c`');
    await queryRunner.query('ALTER TABLE `cart_product` DROP FOREIGN KEY `FK_3c7e1dfabf88ee8608e627e253b`');
    await queryRunner.query('ALTER TABLE `order_product` DROP FOREIGN KEY `FK_073c85ed133e05241040bd70f02`');
    await queryRunner.query('ALTER TABLE `order_product` DROP FOREIGN KEY `FK_3fb066240db56c9558a91139431`');
    await queryRunner.query('ALTER TABLE `order` DROP FOREIGN KEY `FK_1a79b2f719ecd9f307d62b81093`');
    await queryRunner.query('ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`');
    await queryRunner.query('DROP INDEX `IDX_559e1bc4d01ef1e56d75117ab9` ON `product_category`');
    await queryRunner.query('DROP INDEX `IDX_930110e92aed1778939fdbdb30` ON `product_category`');
    await queryRunner.query('DROP TABLE `product_category`');
    await queryRunner.query('DROP TABLE `admin`');
    await queryRunner.query('DROP INDEX `REL_d09d285fe1645cd2f0db811e29` ON `payment`');
    await queryRunner.query('DROP TABLE `payment`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `cart_product`');
    await queryRunner.query('DROP TABLE `product`');
    await queryRunner.query('DROP TABLE `order_product`');
    await queryRunner.query('DROP TABLE `order`');
    await queryRunner.query('DROP TABLE `store`');
    await queryRunner.query('DROP TABLE `feedback`');
    await queryRunner.query('DROP TABLE `category`');
  }

}
