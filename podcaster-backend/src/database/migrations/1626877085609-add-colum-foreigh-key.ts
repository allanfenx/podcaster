import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addColumForeighKey1626877085609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("episodes", new TableColumn({
            name: "fileId",
            type: "integer"
        }))


        await queryRunner.createForeignKey("episodes", new TableForeignKey({

            name: "podcastFile",
            columnNames: ['fileId'],
            referencedTableName: 'file',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey("episodes", "podcastFile");
        await queryRunner.dropColumn("episodes", "fileId");
    }

}