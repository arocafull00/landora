import { redirect } from "next/navigation";
import { EditorSection } from "@/components/dashboard/sections/editor-section";
import { getAssetsByUserId } from "@/data/assets";
import { getBlogConfig } from "@/data/blog";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getEffectiveClientId } from "@/lib/auth";
import { toAssetDto } from "@/lib/domain/mappers";
import { AssetsStoreProvider } from "@/stores/assets-store";
import { BlogStoreProvider } from "@/stores/blog-store";

export default async function EditorPage() {
  const userId = await getEffectiveClientId();
  if (!userId) redirect("/sign-in");

  const landing = await getLandingPageByUserId(userId);
  if (!landing) return null;

  const [rows, config] = await Promise.all([
    getAssetsByUserId(userId),
    getBlogConfig(landing.id),
  ]);

  return (
    <AssetsStoreProvider initialRows={rows.map(toAssetDto)}>
      <BlogStoreProvider
        initialConfig={{
          title: config?.title ?? "",
          description: config?.description ?? "",
        }}
      >
        <EditorSection />
      </BlogStoreProvider>
    </AssetsStoreProvider>
  );
}
