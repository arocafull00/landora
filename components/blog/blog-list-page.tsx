"use client";

import { BlogPostCard, type PublicBlogPostSummary } from "@/components/blog/blog-post-card";
import { PortfolioAosInit } from "@/components/templates/portfolio/portfolio-aos-init";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import type { LandingContent } from "@/lib/dashboard-data";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";

type BlogListPageProps = {
  content: LandingContent;
  previewLandingId?: string;
  title: string;
  description: string;
  posts: PublicBlogPostSummary[];
};

export function BlogListPage({
  content,
  previewLandingId,
  title,
  description,
  posts,
}: BlogListPageProps) {
  const homeHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : getPublicLandingPath();

  return (
    <TemplateLazyMotion>
      <div className="min-h-screen bg-portfolio-canvas text-portfolio-ink">
        <PortfolioAosInit />
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
        <main className="mx-auto max-w-6xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
          <section className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1
                className="text-balance text-4xl font-extrabold tracking-[-0.04em] text-portfolio-ink sm:text-5xl"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {title}
              </h1>
              {description ? (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-portfolio-ink-muted">
                  {description}
                </p>
              ) : null}
            </div>
          </section>
          {posts.length === 0 ? (
            <p className="mt-12 text-sm text-portfolio-ink-muted">
              Todavía no hay posts publicados.
            </p>
          ) : (
            <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </section>
          )}
        </main>
        <PortfolioContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
