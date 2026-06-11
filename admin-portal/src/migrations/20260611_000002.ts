import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. cases_rels: add cases_id for related_cases field ─────────────────────
  await db.execute(sql`
    ALTER TABLE "cases_rels"
      ADD COLUMN IF NOT EXISTS "cases_id" integer;

    DO $$ BEGIN
      ALTER TABLE "cases_rels" ADD CONSTRAINT "cases_rels_cases_fk"
        FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "cases_rels_cases_id_idx"
      ON "cases_rels" USING btree ("cases_id");
  `)

  // ── 2. not_found_page global ─────────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "not_found_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "button_url" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "not_found_page_locales" (
      "title" varchar,
      "description" varchar,
      "button_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "not_found_page_locales" ADD CONSTRAINT "not_found_page_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."not_found_page"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "not_found_page_locales_locale_parent_id_unique"
      ON "not_found_page_locales" USING btree ("_locale", "_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "cases_rels" DROP COLUMN IF EXISTS "cases_id";
    DROP TABLE IF EXISTS "not_found_page_locales" CASCADE;
    DROP TABLE IF EXISTS "not_found_page" CASCADE;
  `)
}
