import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "kufar_reviews_section" (
      "id" serial PRIMARY KEY NOT NULL,
      "enabled" boolean DEFAULT true,
      "logo_id" integer,
      "rating_image_id" integer,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "kufar_reviews_section_locales" (
      "heading" varchar DEFAULT 'Репутация, построенная годами...',
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "kufar_reviews_section_reviews" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "kufar_reviews_section" ADD CONSTRAINT "kufar_reviews_section_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "kufar_reviews_section" ADD CONSTRAINT "kufar_reviews_section_rating_image_id_media_id_fk" FOREIGN KEY ("rating_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "kufar_reviews_section_locales" ADD CONSTRAINT "kufar_reviews_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kufar_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "kufar_reviews_section_reviews" ADD CONSTRAINT "kufar_reviews_section_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kufar_reviews_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "kufar_reviews_section_reviews" ADD CONSTRAINT "kufar_reviews_section_reviews_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "kufar_reviews_section_logo_idx" ON "kufar_reviews_section" USING btree ("logo_id");
    CREATE INDEX IF NOT EXISTS "kufar_reviews_section_rating_image_idx" ON "kufar_reviews_section" USING btree ("rating_image_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "kufar_reviews_section_locales_locale_parent_id_unique" ON "kufar_reviews_section_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "kufar_reviews_section_reviews_order_idx" ON "kufar_reviews_section_reviews" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "kufar_reviews_section_reviews_parent_id_idx" ON "kufar_reviews_section_reviews" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "kufar_reviews_section_reviews_image_idx" ON "kufar_reviews_section_reviews" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "kufar_reviews_section_reviews" CASCADE;
    DROP TABLE IF EXISTS "kufar_reviews_section_locales" CASCADE;
    DROP TABLE IF EXISTS "kufar_reviews_section" CASCADE;
  `)
}
