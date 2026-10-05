import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getCatalogConfig } from "@/data/products";
import { requireProductsAccess } from "@/lib/require-products-access";
import { CatalogConfigForm } from "@/components/products/components/catalog-config-form";
export default async function CatalogSettingsPage() {
  const userId = await getEffectiveClientId();
  if (!userId) return null;
  const landing = await getLandingPageByUserId(userId);
  if (!landing || !await requireProductsAccess(landing.id)) return null;
  const config = await getCatalogConfig(landing.id);
  return <CatalogConfigForm key={config.version} landingId={landing.id} config={config} nuvolets={landing.template === "nuvolets"} />;
}

