import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { BlogListPage } from "@/components/blog/blog-list-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getBlogConfig, getBlogPostsByLandingId } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";

export async function BlogListPageContent({ slug }: { slug: string }) {
  "use cache";

  cacheLife("max");

  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) notFound();

  const [config, posts] = await Promise.all([
    getBlogConfig(landing.id),
    getBlogPostsByLandingId(landing.id, true),
  ]);

  const content = landing.content;
  const brand = content.brand || landing.name;

  return (
    <SiteThemeScope appearance={content.appearance} template={landing.template}>
      <BlogListPage
        content={content}
        description={config?.description || ""}
        posts={posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          heroImage: post.heroImage,
          publishedAt: post.updatedAt ?? post.createdAt,
        }))}
        title={config?.title || `${brand} Blog`}
      />
    </SiteThemeScope>
  );
}
