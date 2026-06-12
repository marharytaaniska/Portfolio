import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "og_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "favicon_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings"
      DROP COLUMN IF EXISTS "og_image_id",
      DROP COLUMN IF EXISTS "favicon_id";
  `)
}
