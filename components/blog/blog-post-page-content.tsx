import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getBlogPostBySlug } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getCopyrightYear } from "@/lib/copyright-year";

export async function BlogPostPageContent({
  postSlug,
  slug,
}: {
  postSlug: string;
  slug: string;
}) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) notFound();

  const [post, copyrightYear] = await Promise.all([
    getBlogPostBySlug(landing.id, postSlug),
    getCopyrightYear(),
  ]);
  if (!post) notFound();

  const content = landing.content;

  return (
    <SiteThemeScope appearance={content.appearance} template={landing.template}>
      <BlogPostPage
        content={content}
        copyrightYear={copyrightYear}
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
