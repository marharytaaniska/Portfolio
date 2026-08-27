import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials_locales" ADD COLUMN IF NOT EXISTS "author_name" varchar;

    UPDATE "testimonials_locales" tl
    SET "author_name" = t."author_name"
    FROM "testimonials" t
    WHERE tl."_parent_id" = t."id" AND tl."author_name" IS NULL;

    ALTER TABLE "testimonials_locales" ALTER COLUMN "author_name" SET NOT NULL;

    ALTER TABLE "testimonials" DROP COLUMN IF EXISTS "author_name";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "author_name" varchar;

    UPDATE "testimonials" t
    SET "author_name" = tl."author_name"
    FROM "testimonials_locales" tl
    WHERE tl."_parent_id" = t."id" AND tl."_locale" = 'ru';

    ALTER TABLE "testimonials" ALTER COLUMN "author_name" SET NOT NULL;

    ALTER TABLE "testimonials_locales" DROP COLUMN IF EXISTS "author_name";
  `)
}
