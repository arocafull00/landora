import { EditorSection } from "@/components/dashboard/sections/editor-section";
import { EditorCatalogProvider } from "@/components/dashboard/editor/editor-catalog-context";
import { getEditorProductSlug, getEditorProductCategories } from "@/data/editor-pages";
import { hasProductsAccess } from "@/data/product-access";
import { getAssetsByUserId } from "@/data/assets";
import { getBlogConfig } from "@/data/blog";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { requireEffectiveClientId } from "@/lib/auth";
import { toAssetDto } from "@/lib/domain/mappers";
import { AssetsStoreProvider } from "@/stores/assets-store";
import { BlogStoreProvider } from "@/stores/blog-store";

export default async function EditorPage() {
  const userId = await requireEffectiveClientId();

  const [landing, productsEnabled] = await Promise.all([
    getLandingPageByUserId(userId), hasProductsAccess(userId),
  ]);
  if (!landing) return null;

  const [rows, config, productSlug, categories] = await Promise.all([
    getAssetsByUserId(userId),
    getBlogConfig(landing.id),
    productsEnabled ? getEditorProductSlug(landing.id) : null,
    productsEnabled && landing.template === "nuvolets" ? getEditorProductCategories(landing.id) : [],
  ]);

  return (
    <AssetsStoreProvider initialRows={rows.map(toAssetDto)}>
      <BlogStoreProvider
        initialConfig={{
          title: config?.title ?? "",
          description: config?.description ?? "",
        }}
      >
        <EditorCatalogProvider enabled={productsEnabled} productSlug={productSlug} categories={categories}>
          <EditorSection />
        </EditorCatalogProvider>
      </BlogStoreProvider>
    </AssetsStoreProvider>
  );
}
