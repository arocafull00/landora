import "server-only";

import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { requireServerEnv, serverEnv } from "@/lib/env/server";

const deleteResourcesResponseSchema = z.object({
  next_cursor: z.string().optional(),
});

function ensureCloudinaryConfigured() {
  cloudinary.config({
    cloud_name: requireServerEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    api_key: requireServerEnv("CLOUDINARY_API_KEY"),
    api_secret: requireServerEnv("CLOUDINARY_API_SECRET"),
  });
}

export function getAssetFolder(userId: string) {
  return `landora/tenants/${userId}`;
}

export function isCloudinaryConfigured() {
  return Boolean(
    serverEnv.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      serverEnv.CLOUDINARY_API_KEY &&
      serverEnv.CLOUDINARY_API_SECRET,
  );
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

export async function deleteCloudinaryFolder(folder: string): Promise<void> {
  ensureCloudinaryConfigured();

  const resourceTypes = ["image", "video", "raw"] as const;

  for (const resourceType of resourceTypes) {
    let nextCursor: string | undefined;

    do {
      const response = await cloudinary.api.delete_resources_by_prefix(folder, {
        invalidate: true,
        next_cursor: nextCursor,
        resource_type: resourceType,
        type: "upload",
      });
      const parsed = deleteResourcesResponseSchema.safeParse(response);

      if (!parsed.success) {
        throw new Error("Invalid Cloudinary deletion response");
      }

      nextCursor = parsed.data.next_cursor;
    } while (nextCursor);
  }

  try {
    await cloudinary.api.delete_folder(folder);
  } catch (error) {
    if (getHttpStatus(error) !== 404) {
      throw error;
    }
  }
}

function getHttpStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;

  if ("http_code" in error && typeof error.http_code === "number") {
    return error.http_code;
  }

  if ("statusCode" in error && typeof error.statusCode === "number") {
    return error.statusCode;
  }

  return null;
}

export { cloudinary };
