import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "hero" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "relevant_cases_section" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "testimonials_section" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "experience_section" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "enabled" boolean DEFAULT true;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "hero" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "relevant_cases_section" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "testimonials_section" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "experience_section" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "enabled";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "enabled";
  `)
}
