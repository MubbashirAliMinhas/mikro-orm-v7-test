import { Migration } from '@mikro-orm/migrations';

export class Migration20260312101857_test extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "full_name" text not null, "email" text not null, "password" text not null, "bio" text not null default '');`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
