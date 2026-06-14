import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogListPage } from "@/components/blog/blog-list-page";
import { getBlogConfig, getBlogPostsByLandingId } from "@/data/blog";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { normalizeLandingSlug } from "@/lib/blog-slug";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) return {};

  const config = await getBlogConfig(landing.id);
  const brand = landing.branding?.brand || landing.name;

  return {
    title: config?.title || `${brand} Blog`,
    description: config?.description || landing.seo?.description || "",
  };
}

export default async function PublicBlogListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) notFound();

  const [config, posts] = await Promise.all([
    getBlogConfig(landing.id),
    getBlogPostsByLandingId(landing.id, true),
  ]);

  const brand = landing.branding?.brand || landing.name;
  const title = config?.title || `${brand} Blog`;
  const description = config?.description || "";

  return (
    <BlogListPage
      brand={brand}
      brandLogoImage={landing.branding?.brandLogoImage ?? ""}
      brandLogoType={landing.branding?.brandLogoType === "image" ? "image" : "text"}
      description={description}
      landingSlug={normalizeLandingSlug(landing.slug)}
      posts={posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        heroImage: post.heroImage,
        publishedAt: post.updatedAt ?? post.createdAt,
      }))}
      title={title}
    />
  );
}
