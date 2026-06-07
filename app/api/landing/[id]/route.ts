import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByIdAndUserId, updateLandingPage } from "@/data/landing-pages";
import { PatchLandingSchema } from "@/lib/landing-schema";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const clientId = await getEffectiveClientId();

    if (!clientId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const landing = await getLandingPageByIdAndUserId(id, clientId);

    if (!landing) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const result = PatchLandingSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 });
    }

    const patch: Parameters<typeof updateLandingPage>[1] = {
      updatedAt: new Date(),
    };

    if (result.data.contentJson !== undefined) {
      patch.contentJson = result.data.contentJson;
    }

    if (result.data.published !== undefined) {
      patch.published = result.data.published;
    }

    await updateLandingPage(id, patch);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
