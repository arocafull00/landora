ALTER TABLE "landing_branding" ADD COLUMN "content_schema_version" integer DEFAULT 1 NOT NULL;
ALTER TABLE "landing_branding" ADD CONSTRAINT "landing_branding_content_schema_version_positive" CHECK ("content_schema_version" > 0);
