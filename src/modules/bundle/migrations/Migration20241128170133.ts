import { Migration } from '@mikro-orm/migrations';

export class Migration20241128170133 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "bundle" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "bundle_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "bundle" cascade;');
  }

}
