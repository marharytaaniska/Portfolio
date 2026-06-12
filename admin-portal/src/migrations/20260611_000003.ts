import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // case_detail_page: add non-localized related_cases_button_url
  await db.execute(sql`
    ALTER TABLE "case_detail_page"
      ADD COLUMN IF NOT EXISTS "related_cases_button_url" varchar;
  `)

  // case_detail_page_locales: add localized related cases fields
  await db.execute(sql`
    ALTER TABLE "case_detail_page_locales"
      ADD COLUMN IF NOT EXISTS "related_cases_title" varchar,
      ADD COLUMN IF NOT EXISTS "related_cases_description" jsonb,
      ADD COLUMN IF NOT EXISTS "related_cases_button_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "case_detail_page" DROP COLUMN IF EXISTS "related_cases_button_url";
    ALTER TABLE "case_detail_page_locales"
      DROP COLUMN IF EXISTS "related_cases_title",
      DROP COLUMN IF EXISTS "related_cases_description",
      DROP COLUMN IF EXISTS "related_cases_button_label";
  `)
}
