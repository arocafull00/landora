import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { updateLandingPage } from "@/data/landing-pages";
import { upsertLandingSeo } from "@/data/landing-sections";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const landing = await getAuthorizedLanding(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const patch: Parameters<typeof updateLandingPage>[1] = { updatedAt: new Date() };

    if (typeof body.published === "boolean") patch.published = body.published;
    if (typeof body.name === "string" && body.name.trim()) patch.name = body.name.trim();
    if (typeof body.slug === "string" && body.slug.trim()) patch.slug = body.slug.trim();

    const hasSeoTitle = typeof body.seoTitle === "string";
    const hasSeoDescription = typeof body.seoDescription === "string";

    if (hasSeoTitle || hasSeoDescription) {
      await upsertLandingSeo(id, {
        title: hasSeoTitle ? body.seoTitle : (landing.seo?.title ?? ""),
        description: hasSeoDescription
          ? body.seoDescription
          : (landing.seo?.description ?? ""),
      });
    }

    await updateLandingPage(id, patch);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
