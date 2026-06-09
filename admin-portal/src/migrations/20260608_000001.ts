import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "experience_section_locales"
      ADD COLUMN IF NOT EXISTS "show_more_label" varchar,
      ADD COLUMN IF NOT EXISTS "collapse_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "experience_section_locales"
      DROP COLUMN IF EXISTS "show_more_label",
      DROP COLUMN IF EXISTS "collapse_label";
  `)
}
