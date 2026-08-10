ALTER TABLE "landing_gallery" ADD COLUMN IF NOT EXISTS "virtual_tour_url" text DEFAULT '' NOT NULL;
ALTER TABLE "landing_gallery" ADD COLUMN IF NOT EXISTS "virtual_tour_label" text DEFAULT '' NOT NULL;
