import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CategoryProducts1709607262398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
            ],
        }), true);

        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "slug",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "imageUrl",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "price",
                    type: "float",
                    isNullable: false,
                },
                {
                    name: "categoryId",
                    type: "int",
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["categoryId"],
                    referencedTableName: "category",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product");
        await queryRunner.dropTable("category");
    }

}
