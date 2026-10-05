ALTER TABLE "store_products" ADD COLUMN "draft_content" jsonb;
--> statement-breakpoint
ALTER TABLE "store_products" ADD CONSTRAINT "store_products_draft_content_check"
CHECK ("draft_content" IS NULL OR (jsonb_typeof("draft_content") = 'object' AND "draft_content"->>'status' = 'draft'));
