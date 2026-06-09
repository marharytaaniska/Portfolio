import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ── 1. testimonials_section_locales: add section_title ──────────────────────
  await db.execute(sql`
    ALTER TABLE "testimonials_section_locales"
      ADD COLUMN IF NOT EXISTS "section_title" varchar DEFAULT 'Reviews';
  `)

  // ── 2. relevant_cases_section_locales: add all_tag_label, show_more_label ───
  await db.execute(sql`
    ALTER TABLE "relevant_cases_section_locales"
      ADD COLUMN IF NOT EXISTS "all_tag_label" varchar DEFAULT 'All',
      ADD COLUMN IF NOT EXISTS "show_more_label" varchar DEFAULT 'Show more';
  `)

  // ── 3. cases: add password_required, password ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "cases"
      ADD COLUMN IF NOT EXISTS "password_required" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "password" varchar;
  `)

  // ── 4. header: add non-localized group fields ────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "header_cv_url" varchar,
      ADD COLUMN IF NOT EXISTS "header_copy_email_text" varchar;
  `)

  // ── 5. header_locales: localized header group fields ─────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_locales" (
      "header_cv_label" varchar,
      "header_copy_email_label" varchar,
      "header_copy_email_success" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "header_locales_locale_parent_id_unique"
      ON "header_locales" USING btree ("_locale", "_parent_id");
  `)

  // ── 6. header_left_menu_items: left menu array ───────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_left_menu_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "anchor" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "header_left_menu_items_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_left_menu_items" ADD CONSTRAINT "header_left_menu_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "header_left_menu_items_locales" ADD CONSTRAINT "header_left_menu_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."header_left_menu_items"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "header_left_menu_items_order_idx"
      ON "header_left_menu_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_left_menu_items_parent_id_idx"
      ON "header_left_menu_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "header_left_menu_items_locales_locale_parent_id_unique"
      ON "header_left_menu_items_locales" USING btree ("_locale", "_parent_id");
  `)

  // ── 7. case_access global ────────────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "case_access" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "case_access_locales" (
      "modal_title" varchar,
      "password_placeholder" varchar,
      "continue_button_label" varchar,
      "invalid_password_error" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "case_access_locales" ADD CONSTRAINT "case_access_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."case_access"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "case_access_locales_locale_parent_id_unique"
      ON "case_access_locales" USING btree ("_locale", "_parent_id");
  `)

  // ── 8. case_detail_page global ───────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "case_detail_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "case_detail_page_locales" (
      "label_client" varchar,
      "label_services" varchar,
      "label_industries" varchar,
      "label_date" varchar,
      "back_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "case_detail_page_locales" ADD CONSTRAINT "case_detail_page_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."case_detail_page"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "case_detail_page_locales_locale_parent_id_unique"
      ON "case_detail_page_locales" USING btree ("_locale", "_parent_id");
  `)

  // ── 9. cases_blocks_button_block ─────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "cases_blocks_button_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "button_url" varchar NOT NULL,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "cases_blocks_button_block_locales" (
      "button_label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "cases_blocks_button_block" ADD CONSTRAINT "cases_blocks_button_block_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_blocks_button_block_locales" ADD CONSTRAINT "cases_blocks_button_block_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."cases_blocks_button_block"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "cases_blocks_button_block_order_idx"
      ON "cases_blocks_button_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "cases_blocks_button_block_parent_id_idx"
      ON "cases_blocks_button_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "cases_blocks_button_block_path_idx"
      ON "cases_blocks_button_block" USING btree ("_path");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_blocks_button_block_locales_locale_parent_id_unique"
      ON "cases_blocks_button_block_locales" USING btree ("_locale", "_parent_id");
  `)

  // ── 10. cases_blocks_divider_block ───────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "cases_blocks_divider_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "cases_blocks_divider_block" ADD CONSTRAINT "cases_blocks_divider_block_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "cases_blocks_divider_block_order_idx"
      ON "cases_blocks_divider_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "cases_blocks_divider_block_parent_id_idx"
      ON "cases_blocks_divider_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "cases_blocks_divider_block_path_idx"
      ON "cases_blocks_divider_block" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "testimonials_section_locales" DROP COLUMN IF EXISTS "section_title";
    ALTER TABLE "relevant_cases_section_locales"
      DROP COLUMN IF EXISTS "all_tag_label",
      DROP COLUMN IF EXISTS "show_more_label";
    ALTER TABLE "cases"
      DROP COLUMN IF EXISTS "password_required",
      DROP COLUMN IF EXISTS "password";
    ALTER TABLE "header"
      DROP COLUMN IF EXISTS "header_cv_url",
      DROP COLUMN IF EXISTS "header_copy_email_text";
    DROP TABLE IF EXISTS "header_locales" CASCADE;
    DROP TABLE IF EXISTS "header_left_menu_items_locales" CASCADE;
    DROP TABLE IF EXISTS "header_left_menu_items" CASCADE;
    DROP TABLE IF EXISTS "case_access_locales" CASCADE;
    DROP TABLE IF EXISTS "case_access" CASCADE;
    DROP TABLE IF EXISTS "case_detail_page_locales" CASCADE;
    DROP TABLE IF EXISTS "case_detail_page" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_button_block_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_button_block" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_divider_block" CASCADE;
  `)
}
