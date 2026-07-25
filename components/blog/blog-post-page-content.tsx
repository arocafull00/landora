import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getBlogPostBySlug } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";

export async function BlogPostPageContent({
  postSlug,
  slug,
}: {
  postSlug: string;
  slug: string;
}) {
  "use cache";

  cacheLife("max");

  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) notFound();

  const post = await getBlogPostBySlug(landing.id, postSlug);
  if (!post) notFound();

  const content = landing.content;

  return (
    <SiteThemeScope appearance={content.appearance} template={landing.template}>
      <BlogPostPage
        content={content}
        post={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          heroImage: post.heroImage,
          publishedAt: post.updatedAt ?? post.createdAt,
        }}
      />
    </SiteThemeScope>
  );
}
