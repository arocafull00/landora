CREATE TABLE "store_product_brands" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "landing_id" uuid NOT NULL REFERENCES "landing_pages"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  CONSTRAINT "store_product_brands_name_check" CHECK ("name" = trim("name") AND length("name") BETWEEN 1 AND 160)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "store_product_brands_name_unique" ON "store_product_brands" ("landing_id", lower(trim("name")));
--> statement-breakpoint
INSERT INTO "store_product_brands" ("landing_id", "name")
SELECT "landing_id", min(trim("name")) FROM (
  SELECT "landing_id", "brand" AS "name" FROM "store_products"
  UNION ALL
  SELECT "landing_id", "draft_content"->>'brand' AS "name" FROM "store_products"
) brands
WHERE trim("name") <> ''
GROUP BY "landing_id", lower(trim("name"));
--> statement-breakpoint
UPDATE "store_products" p SET "brand" = b."name", "version" = p."version" + 1, "updated_at" = now()
FROM "store_product_brands" b
WHERE p."landing_id" = b."landing_id" AND lower(trim(p."brand")) = lower(b."name") AND p."brand" <> b."name";
--> statement-breakpoint
UPDATE "store_products" p SET "draft_content" = jsonb_set(p."draft_content", '{brand}', to_jsonb(b."name")), "version" = p."version" + 1, "updated_at" = now()
FROM "store_product_brands" b
WHERE p."landing_id" = b."landing_id" AND lower(trim(p."draft_content"->>'brand')) = lower(b."name") AND p."draft_content"->>'brand' <> b."name";
--> statement-breakpoint
ALTER TABLE "store_product_brands" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "store_product_brands" FROM anon, authenticated;
