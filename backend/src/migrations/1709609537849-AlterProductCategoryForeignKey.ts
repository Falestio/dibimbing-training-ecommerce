import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterProductCategoryForeignKey1709609537849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812",
            ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812"
            FOREIGN KEY ("categoryId") REFERENCES "category"("id")
            ON DELETE SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812",
            ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812"
            FOREIGN KEY ("categoryId") REFERENCES "category"("id")
        `);
    }

}
