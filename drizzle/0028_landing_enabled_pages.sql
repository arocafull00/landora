ALTER TABLE "landing_branding" ADD COLUMN "enabled_pages" jsonb DEFAULT '[]'::jsonb NOT NULL;
