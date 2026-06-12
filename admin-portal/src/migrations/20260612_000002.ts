import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_settings_locales" (
      "og_title" varchar,
      "og_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL,
      CONSTRAINT "site_settings_locales_parent_id_locale_unique" UNIQUE ("_locale", "_parent_id")
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings_locales"
        ADD CONSTRAINT "site_settings_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "site_settings"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_locales" CASCADE;
  `)
}
