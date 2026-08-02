import {
  BlogPostArticle,
  type PublicBlogPost,
} from "@/components/blog/blog-post-article";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import type { LandingContent } from "@/lib/dashboard-data";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";

export type { PublicBlogPost };

type BlogPostPageProps = {
  content: LandingContent;
  copyrightYear: number;
  previewLandingId?: string;
  post: PublicBlogPost;
};

export function BlogPostPage({
  content,
  copyrightYear,
  previewLandingId,
  post,
}: BlogPostPageProps) {
  const homeHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : getPublicLandingPath();
  const blogHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId, "/blog")
    : getPublicLandingPath("/blog");

  return (
    <div className="min-h-screen bg-portfolio-canvas text-portfolio-ink">
      <>
        <PortfolioNav
          activePage="blog"
          brand={content.brand || "Mora."}
          brandLogoImage={content.brandLogoImage ?? ""}
          brandLogoType={content.brandLogoType ?? "text"}
          ctaHref="#contacto"
          ctaLabel={content.hero.ctaLabel ?? ""}
          heroNavTone="dark"
          heroVariantId="portfolio"
          homeHref={homeHref}
          homePageTarget={previewLandingId ? { type: "home" } : undefined}
          navLinks={[]}
          overHero={false}
        />
      </>
      <BlogPostArticle blogHref={blogHref} post={post} />
      <PortfolioContactSection content={content} copyrightYear={copyrightYear} />
    </div>
  );
}
