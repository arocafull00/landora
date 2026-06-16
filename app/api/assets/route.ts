import { getEffectiveClientId } from "@/lib/auth";
import { getAssetFolder } from "@/lib/cloudinary";
import { getAssetsByUserId, insertAsset } from "@/data/assets";

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

  let body: {
    publicId?: string;
    url?: string;
    name?: string;
    mimeType?: string;
    width?: number;
    height?: number;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { publicId, url, name, mimeType, width, height } = body;

  if (!publicId || !url) {
    return Response.json({ error: "Invalid asset data" }, { status: 400 });
  }

  const folderPrefix = getAssetFolder(userId);
  if (!publicId.startsWith(folderPrefix)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const row = await insertAsset({
      userId,
      publicId,
      url,
      name: name || "asset",
      mimeType: mimeType || "",
      width: width ?? null,
      height: height ?? null,
    });

    return Response.json(row);
  } catch {
    return Response.json({ error: "Failed to save asset" }, { status: 500 });
  }
}
