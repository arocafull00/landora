import { redirect } from "next/navigation";
import { BlogSection } from "@/components/dashboard/sections/blog-section";
import { getAssetsByUserId } from "@/data/assets";
import { getBlogPostsByLandingId } from "@/data/blog";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getEffectiveClientId } from "@/lib/auth";
import { toAssetDto, toBlogPostDto } from "@/lib/domain/mappers";
import { AssetsStoreProvider } from "@/stores/assets-store";
import { BlogStoreProvider } from "@/stores/blog-store";

export default async function BlogPage() {
  const userId = await getEffectiveClientId();
  if (!userId) redirect("/sign-in");

  const landing = await getLandingPageByUserId(userId);
  if (!landing) return null;

  const [assets, posts] = await Promise.all([
    getAssetsByUserId(userId),
    getBlogPostsByLandingId(landing.id),
  ]);

  return (
    <AssetsStoreProvider initialRows={assets.map(toAssetDto)}>
      <BlogStoreProvider initialPosts={posts.map(toBlogPostDto)}>
        <BlogSection />
      </BlogStoreProvider>
    </AssetsStoreProvider>
  );
}
