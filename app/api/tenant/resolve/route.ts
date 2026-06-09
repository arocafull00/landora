import { getLandingByCustomDomain } from "@/data/domains";
import { normalizeHost } from "@/lib/app-host";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");

  if (!host) {
    return Response.json({ error: "host is required" }, { status: 400 });
  }

  try {
    const landing = await getLandingByCustomDomain(normalizeHost(host));

    if (!landing) {
      return Response.json({ error: "not found" }, { status: 404 });
    }

    const slug = landing.slug.replace(/^\//, "");

    return Response.json({ slug });
  } catch {
    return Response.json({ error: "internal error" }, { status: 500 });
  }
}
