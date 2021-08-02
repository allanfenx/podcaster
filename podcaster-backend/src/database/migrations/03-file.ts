import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class file1620500885545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "file",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    generationStrategy: "increment",
                    isGenerated: true
                },
                {
                    name: "url",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "duration",
                    type: "integer"
                }
            ]


        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("file")
    }

}
