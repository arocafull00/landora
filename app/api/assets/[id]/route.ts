import { getEffectiveClientId } from "@/lib/auth";
import { deleteCloudinaryAsset, getAssetFolder } from "@/lib/cloudinary";
import {
  deleteAssetById,
  getAssetByIdAndUserId,
  updateAssetName,
} from "@/data/assets";
import { parseJsonBody } from "@/lib/api/parse-json";
import { resourceIdSchema, updateAssetSchema } from "@/lib/schemas/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsedId = resourceIdSchema.safeParse((await params).id);
  if (!parsedId.success) {
    return Response.json({ error: "Invalid asset id" }, { status: 400 });
  }

  const parsed = await parseJsonBody(req, updateAssetSchema);
  if (!parsed.success) return parsed.response;

  const { name } = parsed.data;
  const id = parsedId.data;

  const row = await getAssetByIdAndUserId(id, userId);

  if (!row) return Response.json({ error: "Not found" }, { status: 404 });

  try {
    const updated = await updateAssetName(id, name);
    return Response.json(updated);
  } catch {
    return Response.json({ error: "Failed to update asset" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsedId = resourceIdSchema.safeParse((await params).id);
  if (!parsedId.success) {
    return Response.json({ error: "Invalid asset id" }, { status: 400 });
  }
  const id = parsedId.data;

  const row = await getAssetByIdAndUserId(id, userId);

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

  try {
    await deleteAssetById(id);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
