import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { assets } from "@/db/schema";
import { getEffectiveClientId } from "@/lib/auth";
import { deleteCloudinaryAsset, getAssetFolder } from "@/lib/cloudinary";

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

  const folderPrefix = getAssetFolder(userId);
  if (!row.publicId.startsWith(folderPrefix)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let deletedFromCloudinary = false;

  try {
    deletedFromCloudinary = await deleteCloudinaryAsset(row.publicId, row.mimeType);
  } catch {
    return Response.json({ error: "Failed to delete from Cloudinary" }, { status: 502 });
  }

  if (!deletedFromCloudinary) {
    return Response.json({ error: "Failed to delete from Cloudinary" }, { status: 502 });
  }

  await db.delete(assets).where(eq(assets.id, id));

  return new Response(null, { status: 204 });
}
