import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { assets } from "@/db/schema";
import { getEffectiveClientId } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const [row] = await db
    .select()
    .from(assets)
    .where(and(eq(assets.id, id), eq(assets.userId, userId)));

  if (!row) return Response.json({ error: "Not found" }, { status: 404 });

  try {
    await cloudinary.uploader.destroy(row.publicId);
  } catch {
    // ignore cloudinary errors, still delete from db
  }

  await db.delete(assets).where(eq(assets.id, id));

  return new Response(null, { status: 204 });
}
