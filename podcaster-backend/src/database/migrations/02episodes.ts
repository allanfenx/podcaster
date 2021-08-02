import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class episodes1620490480149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "episodes",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    generationStrategy: "increment",
                    isGenerated: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "members",
                    type: "varchar"
                },
                {
                    name: "published_at",
                    type: "varchar"
                },
                {
                    name: "thumbnail",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                }
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("episodes")
    }

}
