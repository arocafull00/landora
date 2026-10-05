CREATE TABLE "store_products" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "landing_id" uuid NOT NULL REFERENCES "landing_pages"("id") ON DELETE CASCADE,
  "title" text NOT NULL, "subtitle" text NOT NULL DEFAULT '', "slug" text NOT NULL,
  "description" text NOT NULL DEFAULT '', "category" text NOT NULL DEFAULT '', "brand" text NOT NULL DEFAULT '',
  "tags" jsonb NOT NULL DEFAULT '[]', "featured" boolean NOT NULL DEFAULT false, "images" jsonb NOT NULL DEFAULT '[]',
  "price_cents" integer, "previous_price_cents" integer,
  "material" text NOT NULL DEFAULT '', "composition" text NOT NULL DEFAULT '', "dimensions" text NOT NULL DEFAULT '', "weight" text NOT NULL DEFAULT '',
  "characteristics" jsonb NOT NULL DEFAULT '[]', "status" text NOT NULL DEFAULT 'draft',
  "legacy_id" text, "legacy_appearance" jsonb, "sort_order" integer NOT NULL DEFAULT 0, "favorite_order" integer NOT NULL DEFAULT 0, "version" integer NOT NULL DEFAULT 1,
  "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "store_products_landing_slug_unique" UNIQUE ("landing_id", "slug"),
  CONSTRAINT "store_products_id_landing_unique" UNIQUE ("id", "landing_id"),
  CONSTRAINT "store_products_legacy_unique" UNIQUE ("landing_id", "legacy_id"),
  CONSTRAINT "store_products_status_check" CHECK ("status" IN ('draft', 'published', 'archived')),
  CONSTRAINT "store_products_price_check" CHECK ("price_cents" IS NULL OR "price_cents" >= 0),
  CONSTRAINT "store_products_previous_price_check" CHECK ("previous_price_cents" IS NULL OR ("price_cents" IS NOT NULL AND "previous_price_cents" > "price_cents")),
  CONSTRAINT "store_products_published_check" CHECK ("status" <> 'published' OR ("price_cents" IS NOT NULL AND jsonb_array_length("images") > 0))
);
CREATE INDEX "store_products_landing_status_idx" ON "store_products" ("landing_id", "status");
CREATE TABLE "store_product_variants" (
  "id" uuid PRIMARY KEY NOT NULL,
  "product_id" uuid NOT NULL REFERENCES "store_products"("id") ON DELETE CASCADE,
  "landing_id" uuid NOT NULL REFERENCES "landing_pages"("id") ON DELETE CASCADE,
  "size" text NOT NULL DEFAULT '', "color" text NOT NULL DEFAULT '', "sku" text,
  "stock" integer, "price_cents" integer, "previous_price_cents" integer, "sort_order" integer NOT NULL DEFAULT 0,
  CONSTRAINT "store_product_variants_product_landing_fk" FOREIGN KEY ("product_id", "landing_id") REFERENCES "store_products"("id", "landing_id") ON DELETE CASCADE,
  CONSTRAINT "store_product_variants_stock_check" CHECK ("stock" IS NULL OR "stock" >= 0),
  CONSTRAINT "store_product_variants_price_check" CHECK ("price_cents" IS NULL OR "price_cents" >= 0),
  CONSTRAINT "store_product_variants_previous_price_check" CHECK ("previous_price_cents" IS NULL OR "previous_price_cents" >= 0)
);
CREATE UNIQUE INDEX "store_product_variants_combination_unique" ON "store_product_variants" ("product_id", lower(trim("size")), lower(trim("color")));
CREATE UNIQUE INDEX "store_product_variants_sku_unique" ON "store_product_variants" ("landing_id", upper(trim("sku"))) WHERE "sku" IS NOT NULL;
CREATE INDEX "store_product_variants_product_idx" ON "store_product_variants" ("product_id");
CREATE TABLE "store_catalog_config" (
  "landing_id" uuid PRIMARY KEY REFERENCES "landing_pages"("id") ON DELETE CASCADE,
  "enabled" boolean NOT NULL DEFAULT false, "adopted" boolean NOT NULL DEFAULT false,
  "title" text NOT NULL DEFAULT 'Productos', "description" text NOT NULL DEFAULT '', "whatsapp_phone" text NOT NULL DEFAULT '', "version" integer NOT NULL DEFAULT 1
);
ALTER TABLE "store_products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "store_product_variants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "store_catalog_config" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "store_products", "store_product_variants", "store_catalog_config" FROM anon, authenticated;
CREATE FUNCTION "public"."validate_store_product_inventory"() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog, public AS $$
DECLARE target_id uuid; target_ids uuid[];
BEGIN
  IF TG_TABLE_NAME = 'store_products' THEN
    target_ids := ARRAY[COALESCE(NEW.id, OLD.id)];
  ELSE
    target_ids := ARRAY[NEW.product_id, OLD.product_id];
  END IF;
  FOREACH target_id IN ARRAY target_ids LOOP
    IF EXISTS (
      SELECT 1 FROM public.store_products p WHERE p.id = target_id AND p.status = 'published'
      AND (
        NOT EXISTS (SELECT 1 FROM public.store_product_variants v WHERE v.product_id = p.id)
        OR EXISTS (
          SELECT 1 FROM public.store_product_variants v WHERE v.product_id = p.id
          AND (v.stock IS NULL OR (COALESCE(v.previous_price_cents, p.previous_price_cents) IS NOT NULL AND COALESCE(v.previous_price_cents, p.previous_price_cents) <= COALESCE(v.price_cents, p.price_cents)))
        )
      )
    ) THEN
      RAISE EXCEPTION USING ERRCODE = '23514', MESSAGE = 'Invalid published product inventory';
    END IF;
  END LOOP;
  RETURN NULL;
END;
$$;
REVOKE ALL ON FUNCTION "public"."validate_store_product_inventory"() FROM PUBLIC, anon, authenticated;
CREATE CONSTRAINT TRIGGER "store_products_inventory_check"
AFTER INSERT OR UPDATE ON "store_products" DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "public"."validate_store_product_inventory"();
CREATE CONSTRAINT TRIGGER "store_product_variants_inventory_check"
AFTER INSERT OR UPDATE OR DELETE ON "store_product_variants" DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "public"."validate_store_product_inventory"();
