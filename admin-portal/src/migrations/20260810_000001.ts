import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "cover_autoplay" boolean DEFAULT true;
    ALTER TABLE "cases_blocks_media_block_images" ADD COLUMN IF NOT EXISTS "autoplay" boolean DEFAULT true;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "cover_autoplay";
    ALTER TABLE "cases_blocks_media_block_images" DROP COLUMN IF EXISTS "autoplay";
  `)
}
