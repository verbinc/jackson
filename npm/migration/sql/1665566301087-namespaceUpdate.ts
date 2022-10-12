import { MigrationInterface, QueryRunner } from "typeorm"

export class namespaceUpdate1648805358887 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const response = await queryRunner.query("select jackson.key from jackson_store jackson")
    const responseJson = JSON.parse(JSON.stringify(response));
      const searchTerm = ':';
      for (const k in responseJson) {
        const key = responseJson[k].key;
        const tokens2 = key.split(searchTerm).slice(0, 2);
        const value = tokens2.join(searchTerm);
        queryRunner.query(`update jackson_store set namespace = '${value}' where key = '${key}'`)
      }
}

public async down(queryRunner: QueryRunner): Promise<void> {
    const response = await queryRunner.query("select jackson.key from jackson_store jackson")
    const responseJson = JSON.parse(JSON.stringify(response));
      for (const k in responseJson) {
        const key = responseJson[k].key;
        queryRunner.query("update jackson_store set namespace = ? where key = ?" , ['NULL', key])
      }
}

}
