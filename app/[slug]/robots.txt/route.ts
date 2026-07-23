import { NextResponse } from "next/server";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getPublicLandingUrl } from "@/lib/public-site-url";
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

  const landing = await getPublishedLandingBySlug(parsed.data.slug);
  if (!landing) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(
    `User-agent: *\nAllow: /\nSitemap: ${getPublicLandingUrl(landing, "/sitemap.xml")}\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
