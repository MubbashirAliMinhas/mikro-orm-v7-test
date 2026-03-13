import { Migration } from '@mikro-orm/migrations';

export class Migration20260312124034_test3 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add "status" text not null, add "created_at" timestamptz not null, add "updated_at" timestamptz not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "status", drop column "created_at", drop column "updated_at";`);
  }

}
