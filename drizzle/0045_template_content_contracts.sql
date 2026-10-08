ALTER TABLE "landing_pages" ALTER COLUMN "template" DROP DEFAULT;
ALTER TABLE "landing_pages" ALTER COLUMN "template" TYPE text USING "template"::text;
ALTER TABLE "landing_pages" ALTER COLUMN "template" SET DEFAULT 'velar';
ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_template_format" CHECK ("template" ~ '^[a-z][a-z0-9-]{0,79}$');
ALTER TABLE "landing_page_versions" ALTER COLUMN "template" TYPE text USING "template"::text;
ALTER TABLE "landing_page_versions" ADD CONSTRAINT "landing_page_versions_template_format" CHECK ("template" ~ '^[a-z][a-z0-9-]{0,79}$');
ALTER TABLE "landing_branding" ADD COLUMN "template_data" jsonb DEFAULT '{}'::jsonb NOT NULL;
ALTER TABLE "landing_branding" ADD CONSTRAINT "landing_branding_template_data_object" CHECK (jsonb_typeof("template_data") = 'object');
