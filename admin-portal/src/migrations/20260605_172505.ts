import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // ── Create enum types (idempotent via DO block) ──────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."_locales" AS ENUM('ru', 'en');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_heading_color" AS ENUM('var(--ink-900)', 'var(--ink-800)', 'var(--ink-600)', 'var(--accent)');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_body_color" AS ENUM('var(--ink-900)', 'var(--ink-600)', 'var(--ink-400)');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_meta_color" AS ENUM('var(--ink-600)', 'var(--ink-400)', 'var(--ink-300)');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_link_color" AS ENUM('var(--ink-600)', 'var(--ink-900)', 'var(--accent)');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_section_title_size" AS ENUM('32px', '40px', '48px');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_body_font_size" AS ENUM('16px', '18px', '20px');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_experience_section_style_divider_style" AS ENUM('dashed', 'solid', 'none');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── Create new locale tables ─────────────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "tags_locales" (
      "tag_name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cases_blocks_text_block_paragraphs_locales" (
      "content" jsonb,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cases_blocks_text_block_locales" (
      "title" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cases_blocks_media_block_locales" (
      "caption" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cases_blocks_link_block_locales" (
      "link_label" varchar NOT NULL,
      "button_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "cases_locales" (
      "title" varchar NOT NULL,
      "niche" varchar NOT NULL,
      "description" jsonb NOT NULL,
      "client" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "testimonials_locales" (
      "text" jsonb NOT NULL,
      "author_description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "experience_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "experience_locales" (
      "position_title" varchar NOT NULL,
      "period" varchar NOT NULL,
      "responsibilities_title" varchar DEFAULT 'Обязанности и достижения',
      "responsibilities" jsonb NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "hero_locales" (
      "title" varchar NOT NULL,
      "subtitle" varchar NOT NULL,
      "button1_label" varchar NOT NULL,
      "button2_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "relevant_cases_section" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "relevant_cases_section_locales" (
      "section_title" varchar DEFAULT 'Relevant cases' NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "testimonials_section_locales" (
      "section_content" jsonb,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "background_courses" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "year" numeric NOT NULL,
      "order" numeric
    );

    CREATE TABLE IF NOT EXISTS "background_courses_locales" (
      "provider" varchar NOT NULL,
      "course_name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "background_locales" (
      "section_title" varchar NOT NULL,
      "section_description" jsonb,
      "education_edu_label" varchar NOT NULL,
      "education_edu_university" varchar NOT NULL,
      "education_edu_specialty" varchar NOT NULL,
      "education_edu_description" jsonb,
      "courses_label" varchar DEFAULT 'Курсы',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "contacts_social_links_locales" (
      "label" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "contacts_locales" (
      "title" varchar NOT NULL,
      "description_1" jsonb,
      "description_2" jsonb,
      "button1_label" varchar NOT NULL,
      "button2_label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "experience_section" (
      "id" serial PRIMARY KEY NOT NULL,
      "style_heading_color" "enum_experience_section_style_heading_color" DEFAULT 'var(--ink-900)',
      "style_body_color" "enum_experience_section_style_body_color" DEFAULT 'var(--ink-600)',
      "style_meta_color" "enum_experience_section_style_meta_color" DEFAULT 'var(--ink-400)',
      "style_link_color" "enum_experience_section_style_link_color" DEFAULT 'var(--ink-600)',
      "style_entry_gap" numeric DEFAULT 64,
      "style_inner_gap" numeric DEFAULT 48,
      "style_col_gap" numeric DEFAULT 64,
      "style_responsibilities_ratio" numeric DEFAULT 68,
      "style_logo_size" numeric DEFAULT 64,
      "style_section_title_size" "enum_experience_section_style_section_title_size" DEFAULT '48px',
      "style_body_font_size" "enum_experience_section_style_body_font_size" DEFAULT '18px',
      "style_divider_style" "enum_experience_section_style_divider_style" DEFAULT 'dashed',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "experience_section_locales" (
      "section_title" varchar DEFAULT 'Опыт' NOT NULL,
      "section_description" jsonb,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "cv_url" varchar,
      "contact_email" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)

  // ── Drop old courses table if it still exists ─────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
    EXCEPTION WHEN undefined_table THEN null; END $$;

    DROP TABLE IF EXISTS "courses" CASCADE;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
    EXCEPTION WHEN undefined_object THEN null; END $$;

    DROP INDEX IF EXISTS "payload_locked_documents_rels_courses_id_idx";
  `)

  // ── Add order column to tags (idempotent) ────────────────────────────────────
  await db.execute(sql`
    ALTER TABLE "tags" ADD COLUMN IF NOT EXISTS "order" numeric;
  `)

  // ── Foreign key constraints (idempotent via DO blocks) ───────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_blocks_text_block_paragraphs_locales" ADD CONSTRAINT "cases_blocks_text_block_paragraphs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases_blocks_text_block_paragraphs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_blocks_text_block_locales" ADD CONSTRAINT "cases_blocks_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_blocks_media_block_locales" ADD CONSTRAINT "cases_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_blocks_link_block_locales" ADD CONSTRAINT "cases_blocks_link_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases_blocks_link_block"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "cases_locales" ADD CONSTRAINT "cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "experience_links_locales" ADD CONSTRAINT "experience_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_links"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "experience_locales" ADD CONSTRAINT "experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "hero_locales" ADD CONSTRAINT "hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "relevant_cases_section_locales" ADD CONSTRAINT "relevant_cases_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."relevant_cases_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "testimonials_section_locales" ADD CONSTRAINT "testimonials_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "background_courses" ADD CONSTRAINT "background_courses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."background"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "background_courses_locales" ADD CONSTRAINT "background_courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."background_courses"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "background_locales" ADD CONSTRAINT "background_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."background"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "contacts_social_links_locales" ADD CONSTRAINT "contacts_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts_social_links"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "contacts_locales" ADD CONSTRAINT "contacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "experience_section_locales" ADD CONSTRAINT "experience_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // ── Unique / regular indexes (idempotent) ────────────────────────────────────
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_blocks_text_block_paragraphs_locales_locale_parent_id_" ON "cases_blocks_text_block_paragraphs_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_blocks_text_block_locales_locale_parent_id_unique" ON "cases_blocks_text_block_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_blocks_media_block_locales_locale_parent_id_unique" ON "cases_blocks_media_block_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_blocks_link_block_locales_locale_parent_id_unique" ON "cases_blocks_link_block_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "cases_locales_locale_parent_id_unique" ON "cases_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "experience_links_locales_locale_parent_id_unique" ON "experience_links_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "experience_locales_locale_parent_id_unique" ON "experience_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "hero_locales_locale_parent_id_unique" ON "hero_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "relevant_cases_section_locales_locale_parent_id_unique" ON "relevant_cases_section_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "testimonials_section_locales_locale_parent_id_unique" ON "testimonials_section_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "background_courses_order_idx" ON "background_courses" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "background_courses_parent_id_idx" ON "background_courses" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "background_courses_locales_locale_parent_id_unique" ON "background_courses_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "background_locales_locale_parent_id_unique" ON "background_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "contacts_social_links_locales_locale_parent_id_unique" ON "contacts_social_links_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "contacts_locales_locale_parent_id_unique" ON "contacts_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "experience_section_locales_locale_parent_id_unique" ON "experience_section_locales" USING btree ("_locale","_parent_id");
  `)

  // ── Drop non-localized columns that moved to *_locales tables ────────────────
  await db.execute(sql`
    ALTER TABLE "tags" DROP COLUMN IF EXISTS "tag_name";
    ALTER TABLE "cases_blocks_text_block_paragraphs" DROP COLUMN IF EXISTS "content";
    ALTER TABLE "cases_blocks_text_block" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "cases_blocks_media_block" DROP COLUMN IF EXISTS "caption";
    ALTER TABLE "cases_blocks_link_block" DROP COLUMN IF EXISTS "link_label";
    ALTER TABLE "cases_blocks_link_block" DROP COLUMN IF EXISTS "button_label";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "niche";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "client";
    ALTER TABLE "cases" DROP COLUMN IF EXISTS "date";
    ALTER TABLE "testimonials" DROP COLUMN IF EXISTS "text";
    ALTER TABLE "testimonials" DROP COLUMN IF EXISTS "author_description";
    ALTER TABLE "experience_links" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "experience" DROP COLUMN IF EXISTS "position_title";
    ALTER TABLE "experience" DROP COLUMN IF EXISTS "period";
    ALTER TABLE "experience" DROP COLUMN IF EXISTS "responsibilities_title";
    ALTER TABLE "experience" DROP COLUMN IF EXISTS "responsibilities";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "courses_id";
    ALTER TABLE "hero" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "hero" DROP COLUMN IF EXISTS "subtitle";
    ALTER TABLE "hero" DROP COLUMN IF EXISTS "button1_label";
    ALTER TABLE "hero" DROP COLUMN IF EXISTS "button2_label";
    ALTER TABLE "testimonials_section" DROP COLUMN IF EXISTS "section_description";
    ALTER TABLE "testimonials_section" DROP COLUMN IF EXISTS "section_link_label";
    ALTER TABLE "testimonials_section" DROP COLUMN IF EXISTS "section_link_url";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "section_title";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "section_description";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "education_edu_label";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "education_edu_university";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "education_edu_specialty";
    ALTER TABLE "background" DROP COLUMN IF EXISTS "education_edu_description";
    ALTER TABLE "contacts_social_links" DROP COLUMN IF EXISTS "label";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "description_1";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "description_2";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "button1_label";
    ALTER TABLE "contacts" DROP COLUMN IF EXISTS "button2_label";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "courses" (
      "id" serial PRIMARY KEY NOT NULL,
      "courses_label" varchar DEFAULT 'Курсы' NOT NULL,
      "provider" varchar NOT NULL,
      "course_name" varchar NOT NULL,
      "year" numeric NOT NULL,
      "order" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "tags_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "cases_blocks_text_block_paragraphs_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "cases_blocks_text_block_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "cases_blocks_media_block_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "cases_blocks_link_block_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "cases_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "experience_links_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "experience_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "hero_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "relevant_cases_section" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "relevant_cases_section_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "testimonials_section_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "background_courses" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "background_courses_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "background_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "contacts_social_links_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "contacts_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "experience_section" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "experience_section_locales" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "tags_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_text_block_paragraphs_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_text_block_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_media_block_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_blocks_link_block_locales" CASCADE;
    DROP TABLE IF EXISTS "cases_locales" CASCADE;
    DROP TABLE IF EXISTS "testimonials_locales" CASCADE;
    DROP TABLE IF EXISTS "experience_links_locales" CASCADE;
    DROP TABLE IF EXISTS "experience_locales" CASCADE;
    DROP TABLE IF EXISTS "hero_locales" CASCADE;
    DROP TABLE IF EXISTS "relevant_cases_section" CASCADE;
    DROP TABLE IF EXISTS "relevant_cases_section_locales" CASCADE;
    DROP TABLE IF EXISTS "testimonials_section_locales" CASCADE;
    DROP TABLE IF EXISTS "background_courses" CASCADE;
    DROP TABLE IF EXISTS "background_courses_locales" CASCADE;
    DROP TABLE IF EXISTS "background_locales" CASCADE;
    DROP TABLE IF EXISTS "contacts_social_links_locales" CASCADE;
    DROP TABLE IF EXISTS "contacts_locales" CASCADE;
    DROP TABLE IF EXISTS "experience_section" CASCADE;
    DROP TABLE IF EXISTS "experience_section_locales" CASCADE;
    DROP TABLE IF EXISTS "site_settings" CASCADE;
    ALTER TABLE "tags" ADD COLUMN IF NOT EXISTS "tag_name" varchar NOT NULL DEFAULT '';
    ALTER TABLE "cases_blocks_text_block_paragraphs" ADD COLUMN IF NOT EXISTS "content" jsonb;
    ALTER TABLE "cases_blocks_text_block" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "cases_blocks_media_block" ADD COLUMN IF NOT EXISTS "caption" varchar;
    ALTER TABLE "cases_blocks_link_block" ADD COLUMN IF NOT EXISTS "link_label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "cases_blocks_link_block" ADD COLUMN IF NOT EXISTS "button_label" varchar;
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL DEFAULT '';
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "niche" varchar NOT NULL DEFAULT '';
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "description" jsonb NOT NULL DEFAULT '{}';
    ALTER TABLE "cases" ADD COLUMN IF NOT EXISTS "client" varchar;
    ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "text" jsonb NOT NULL DEFAULT '{}';
    ALTER TABLE "testimonials" ADD COLUMN IF NOT EXISTS "author_description" varchar NOT NULL DEFAULT '';
    ALTER TABLE "experience_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "experience" ADD COLUMN IF NOT EXISTS "position_title" varchar NOT NULL DEFAULT '';
    ALTER TABLE "experience" ADD COLUMN IF NOT EXISTS "period" varchar NOT NULL DEFAULT '';
    ALTER TABLE "experience" ADD COLUMN IF NOT EXISTS "responsibilities_title" varchar DEFAULT 'Обязанности и достижения';
    ALTER TABLE "experience" ADD COLUMN IF NOT EXISTS "responsibilities" jsonb NOT NULL DEFAULT '{}';
    ALTER TABLE "hero" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL DEFAULT '';
    ALTER TABLE "hero" ADD COLUMN IF NOT EXISTS "subtitle" varchar NOT NULL DEFAULT '';
    ALTER TABLE "hero" ADD COLUMN IF NOT EXISTS "button1_label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "hero" ADD COLUMN IF NOT EXISTS "button2_label" varchar;
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "section_title" varchar NOT NULL DEFAULT '';
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "section_description" jsonb;
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "education_edu_label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "education_edu_university" varchar NOT NULL DEFAULT '';
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "education_edu_specialty" varchar NOT NULL DEFAULT '';
    ALTER TABLE "background" ADD COLUMN IF NOT EXISTS "education_edu_description" jsonb;
    ALTER TABLE "contacts_social_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL DEFAULT '';
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "description_1" jsonb;
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "description_2" jsonb;
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "button1_label" varchar NOT NULL DEFAULT '';
    ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "button2_label" varchar;
    CREATE INDEX IF NOT EXISTS "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" USING btree ("created_at");

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
    ALTER TABLE "tags" DROP COLUMN IF EXISTS "order";

    DO $$ BEGIN DROP TYPE "public"."_locales"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_heading_color"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_body_color"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_meta_color"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_link_color"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_section_title_size"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_body_font_size"; EXCEPTION WHEN undefined_object THEN null; END $$;
    DO $$ BEGIN DROP TYPE "public"."enum_experience_section_style_divider_style"; EXCEPTION WHEN undefined_object THEN null; END $$;
  `)
}
