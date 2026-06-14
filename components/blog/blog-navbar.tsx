import Link from "next/link";
import { AssetImage } from "@/components/ui/asset-image";
import { normalizeLandingSlug } from "@/lib/blog-slug";

type BlogNavbarProps = {
  brand: string;
  landingSlug: string;
  brandLogoType?: "text" | "image";
  brandLogoImage?: string;
};

export function BlogNavbar({
  brand,
  landingSlug,
  brandLogoType = "text",
  brandLogoImage = "",
}: BlogNavbarProps) {
  const slug = normalizeLandingSlug(landingSlug);
  const landingHref = `/${slug}`;
  const blogHref = `/${slug}/blog`;

  return (
    <header className="border-b border-outline-variant bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link className="flex min-w-0 items-center gap-3 text-on-surface" href={landingHref}>
          {brandLogoType === "image" && brandLogoImage ? (
            <span className="relative block h-9 w-9 overflow-hidden rounded-md">
              <AssetImage alt={brand} className="object-cover" fill sizes="36px" src={brandLogoImage} />
            </span>
          ) : null}
          <span className="truncate font-headline text-headline-sm text-on-surface">{brand}</span>
        </Link>
        <nav className="flex items-center gap-4 text-body-sm">
          <Link className="text-on-surface-variant transition-colors hover:text-primary" href={landingHref}>
            Inicio
          </Link>
          <Link className="font-medium text-primary" href={blogHref}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
