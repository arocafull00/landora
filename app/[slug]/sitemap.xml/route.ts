import { NextResponse } from "next/server";
import { getPublishedLandingForSitemap } from "@/data/landing-publications";
import {
  createPublicSitemapEntries,
  escapeXml,
} from "@/lib/public-sitemap";
import { proxyLandingQuerySchema } from "@/lib/schemas/proxy-context";

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

  const landing = await getPublishedLandingForSitemap(parsed.data.slug);
  if (!landing) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const urls = createPublicSitemapEntries(landing)
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
}
