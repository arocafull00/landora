"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AssetImage } from "@/components/ui/asset-image";
import { PortfolioAosInit } from "@/components/templates/portfolio/portfolio-aos-init";
import { PortfolioContactSection } from "@/components/templates/portfolio/portfolio-contact-section";
import { PortfolioNav } from "@/components/templates/portfolio/portfolio-nav";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { formatBlogDate } from "@/lib/blog-slug";
import type { LandingContent } from "@/lib/dashboard-data";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";

export type PublicBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  heroImage: string;
  publishedAt: Date | string | null;
};

type BlogPostPageProps = {
  content: LandingContent;
  previewLandingId?: string;
  post: PublicBlogPost;
};

export function BlogPostPage({
  content,
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
        <main>
          {post.heroImage ? (
            <div className="relative mt-20 h-[42vh] min-h-[280px] w-full overflow-hidden bg-portfolio-surface md:mt-24">
              <AssetImage
                alt={post.title}
                className="object-cover"
                fill
                priority
                sizes="100vw"
                src={post.heroImage}
              />
            </div>
          ) : null}
          <article
            className={`mx-auto max-w-3xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16 ${
              post.heroImage ? "pt-12 md:pt-16" : "pt-32 md:pt-40"
            }`}
          >
            <Link
              className="text-sm font-semibold text-portfolio-ink-muted transition-colors hover:text-portfolio-ink"
              href={blogHref}
            >
              Volver al blog
            </Link>
            <time className="mt-6 block text-sm text-portfolio-ink-muted">
              {formatBlogDate(post.publishedAt)}
            </time>
            <h1
              className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-portfolio-ink sm:text-5xl"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-4 text-lg leading-relaxed text-portfolio-ink-muted">
                {post.excerpt}
              </p>
            ) : null}
            <div className="prose prose-neutral mt-10 max-w-none text-portfolio-ink prose-headings:font-[family-name:var(--font-syne)] prose-a:text-portfolio-accent">
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
            <div className="mt-12 border-t border-portfolio-line pt-6">
              <Link
                className="text-sm font-semibold text-portfolio-ink-muted transition-colors hover:text-portfolio-ink"
                href={blogHref}
              >
                Ver todos los posts
              </Link>
            </div>
          </article>
        </main>
        <PortfolioContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
