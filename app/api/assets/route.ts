import { getEffectiveClientId } from "@/lib/auth";
import { getAssetFolder } from "@/lib/cloudinary";
import { getAssetsByUserId, insertAsset } from "@/data/assets";
import { parseJsonBody } from "@/lib/api/parse-json";
import { createAssetSchema } from "@/lib/schemas/api";

export async function GET() {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const rows = await getAssetsByUserId(userId);
    return Response.json(rows);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = await parseJsonBody(req, createAssetSchema);
  if (!parsed.success) return parsed.response;

  const { publicId, url, name, mimeType, width, height } = parsed.data;

  const folderPrefix = getAssetFolder(userId);
  if (!publicId.startsWith(folderPrefix)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const row = await insertAsset({
      userId,
      publicId,
      url,
      name,
      mimeType,
      width: width ?? null,
      height: height ?? null,
    });

    return Response.json(row);
  } catch {
    return Response.json({ error: "Failed to save asset" }, { status: 500 });
  }
}
