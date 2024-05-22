import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1716444681495 implements MigrationInterface {
	name = 'UpdateUserTable1716444681495'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` (\`user_name\`)`);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
		await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(30) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\``);
	}
}
