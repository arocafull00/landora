import Link from "next/link";
import { AssetImage } from "@/components/ui/asset-image";
import { formatBlogDate } from "@/lib/blog-slug";
import { getPublicLandingPath } from "@/lib/public-site-url";

export type PublicBlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  publishedAt: Date | string | null;
};

type BlogPostCardProps = {
  post: PublicBlogPostSummary;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const href = getPublicLandingPath(`/blog/${post.slug}`);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-portfolio-line bg-portfolio-surface transition-[box-shadow,transform] hover:-translate-y-0.5">
      <Link className="relative block aspect-[16/10] overflow-hidden bg-portfolio-canvas" href={href}>
        {post.heroImage ? (
          <AssetImage
            alt={post.title}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={post.heroImage}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-portfolio-ink-muted">
            Sin imagen
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <time className="text-sm text-portfolio-ink-muted">
          {formatBlogDate(post.publishedAt)}
        </time>
        <h2
          className="text-xl font-semibold text-portfolio-ink"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <Link className="transition-colors hover:text-portfolio-ink-muted" href={href}>
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-portfolio-ink-muted">
            {post.excerpt}
          </p>
        ) : null}
        <Link
          className="text-sm font-semibold text-portfolio-accent transition-colors hover:text-portfolio-ink"
          href={href}
        >
          Leer más
        </Link>
      </div>
    </article>
  );
}
