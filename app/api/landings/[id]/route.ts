import { assertLandingAccess } from "@/lib/api/landing-auth";
import { updateLandingPage } from "@/data/landing-pages";
import { upsertLandingSeo } from "@/data/landing-sections";
import { parseJsonBody } from "@/lib/api/parse-json";
import {
  resourceIdSchema,
  updateLandingMetaSchema,
} from "@/lib/schemas/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const parsedId = resourceIdSchema.safeParse((await params).id);
    if (!parsedId.success) {
      return Response.json({ error: "Invalid landing id" }, { status: 400 });
    }
    const id = parsedId.data;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = await parseJsonBody(req, updateLandingMetaSchema);
    if (!parsed.success) return parsed.response;
    const body = parsed.data;

    const patch: Parameters<typeof updateLandingPage>[1] = { updatedAt: new Date() };

    if (body.published !== undefined) patch.published = body.published;
    if (body.name !== undefined) patch.name = body.name;
    if (body.slug !== undefined) patch.slug = body.slug;

    const hasSeoTitle = body.seoTitle !== undefined;
    const hasSeoDescription = body.seoDescription !== undefined;
    const hasSeoFavicon = body.seoFavicon !== undefined;

    if (hasSeoTitle || hasSeoDescription || hasSeoFavicon) {
      await upsertLandingSeo(id, {
        title: body.seoTitle ?? landing.seo?.title ?? "",
        description:
          body.seoDescription ?? landing.seo?.description ?? "",
        favicon: body.seoFavicon ?? landing.seo?.favicon ?? "",
      });
    }

    await updateLandingPage(id, patch);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
