import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { clients, landingPages } from "@/db/schema";
import { PatchLandingSchema } from "@/lib/landing-schema";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const client = await db.query.clients.findFirst({
    where: eq(clients.clerkUserId, userId),
  });

  if (!client) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const landing = await db.query.landingPages.findFirst({
    where: and(eq(landingPages.id, id), eq(landingPages.clientId, client.id)),
  });

  if (!landing) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const result = PatchLandingSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 });
  }

  const patch: Record<string, unknown> = { updatedAt: new Date() };

  if (result.data.contentJson !== undefined) {
    patch.contentJson = result.data.contentJson;
  }

  if (result.data.published !== undefined) {
    patch.published = result.data.published;
  }

  await db
    .update(landingPages)
    .set(patch)
    .where(eq(landingPages.id, id));

  return Response.json({ ok: true });
}
