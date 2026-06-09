import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function getAssetFolder(userId: string) {
  return `landora/tenants/${userId}`;
}

function getCloudinaryResourceType(mimeType: string): "image" | "video" | "raw" {
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  return "raw";
}

export async function deleteCloudinaryAsset(
  publicId: string,
  mimeType?: string | null
): Promise<boolean> {
  const resourceTypes: Array<"image" | "video" | "raw"> = [
    getCloudinaryResourceType(mimeType ?? ""),
    "image",
    "video",
    "raw",
  ];

  const tried = new Set<"image" | "video" | "raw">();

  for (const resourceType of resourceTypes) {
    if (tried.has(resourceType)) continue;
    tried.add(resourceType);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    if (result.result === "ok") return true;
    if (result.result !== "not found") return false;
  }

  return true;
}

export { cloudinary };
