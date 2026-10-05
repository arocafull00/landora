import { NextResponse } from "next/server";
import { getPublishedLandingForSitemap } from "@/data/landing-publications";
import {
  createPublicSitemapEntries,
  escapeXml,
} from "@/lib/public-sitemap";
import { proxyLandingQuerySchema } from "@/lib/schemas/proxy-context";
import { getPublicCatalog } from "@/lib/catalog-context";
import { getPublishedProductSitemap } from "@/data/products";
import { getPublicLandingUrl } from "@/lib/public-site-url";
import { logger } from "@/lib/logger";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const parsed = proxyLandingQuerySchema.safeParse({
    slug: (await params).slug,
  });
  if (!parsed.success || !parsed.data.slug) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
  const landing = await getPublishedLandingForSitemap(parsed.data.slug);
  if (!landing) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const entries = createPublicSitemapEntries(landing);
  const catalog = await getPublicCatalog(parsed.data.slug);
  if (catalog) {
    entries.push({ url: getPublicLandingUrl(landing, "/productos"), lastModified: landing.publishedAt ?? new Date(0) });
    const products = await getPublishedProductSitemap(landing.id);
    for (const product of products) entries.push({ url: getPublicLandingUrl(landing, `/productos/${product.slug}`), lastModified: product.updatedAt });
  }
  const urls = entries
    .map(
      (entry) =>
        `<url><loc>${escapeXml(entry.url)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></url>`,
    )
    .join("");

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
  } catch (error) {
    logger.captureException(error, { action: "public-sitemap" });
    return NextResponse.json({ error: "No se pudo cargar el sitemap" }, { status: 500 });
  }
}
