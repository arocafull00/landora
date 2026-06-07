ALTER TABLE "landing_gallery" ADD COLUMN "image" text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE "landing_pages" SET "template" = 'velar' WHERE "template" = 'toll-story';