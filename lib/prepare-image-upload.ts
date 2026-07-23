import { isAnimatedImageAsset } from "@/lib/is-animated-image";
import { isSvgAsset } from "@/lib/is-svg-url";
import { logger } from "@/lib/logger";

const IMAGE_COMPRESSION_OPTIONS = {
  fileType: "image/webp",
  initialQuality: 0.9,
  maxSizeMB: 1.2,
  maxWidthOrHeight: 2560,
  useWebWorker: true,
} as const;

export async function prepareImageUpload(file: File): Promise<File> {
  if (
    !file.type.startsWith("image/") ||
    isAnimatedImageAsset(file.name, file.type) ||
    isSvgAsset(file.name, file.type)
  ) {
    return file;
  }

  try {
    const { default: imageCompression } = await import(
      "browser-image-compression"
    );
    const compressedFile = await imageCompression(
      file,
      IMAGE_COMPRESSION_OPTIONS,
    );

    return compressedFile.size < file.size ? compressedFile : file;
  } catch (error) {
    logger.warn("Image compression failed; uploading original", {
      mimeType: file.type,
      reason: error instanceof Error ? error.message : "unknown",
      sizeBytes: file.size,
    });
    return file;
  }
}
