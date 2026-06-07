import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assets } from "@/db/schema";
import { getEffectiveClientId } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function GET() {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const rows = await db.query.assets.findMany({
      where: eq(assets.userId, userId),
      orderBy: (a, { desc }) => [desc(a.createdAt)],
    });
    return Response.json(rows);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  const nameField = formData.get("name");

  if (!file || !(file instanceof File)) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const originalName =
    typeof nameField === "string" && nameField
      ? nameField.replace(/\.[^/.]+$/, "")
      : null;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      original_filename: string;
      format: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `landora/tenants/${userId}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve(result as typeof result & { original_filename: string; format: string });
        }
      );
      stream.end(buffer);
    });

    const mimeType = `image/${result.format}`;
    const name = originalName || result.original_filename || "asset";

    const [row] = await db
      .insert(assets)
      .values({
        userId,
        publicId: result.public_id,
        url: result.secure_url,
        name,
        mimeType,
        width: result.width,
        height: result.height,
      })
      .returning();

    return Response.json(row);
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
