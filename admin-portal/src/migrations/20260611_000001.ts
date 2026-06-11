import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials_section_locales"
      ADD COLUMN IF NOT EXISTS "read_more_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials_section_locales"
      DROP COLUMN IF EXISTS "read_more_label";
  `)
}
