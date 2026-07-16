import "server-only";

import { v2 as cloudinary } from "cloudinary";

function ensureCloudinaryConfigured() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

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
  ensureCloudinaryConfigured();

  const resourceTypes: Array<"image" | "video" | "raw"> = [
    getCloudinaryResourceType(mimeType ?? ""),
    "image",
    "video",
    "raw",
  ];

  const uniqueResourceTypes = [...new Set(resourceTypes)];

  const results = await Promise.all(
    uniqueResourceTypes.map((resourceType) =>
      cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate: true,
      })
    )
  );

  for (const result of results) {
    if (result.result === "ok") return true;
    if (result.result !== "not found") return false;
  }

  return true;
}

export { cloudinary };
