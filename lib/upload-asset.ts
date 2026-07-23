import {
  prepareAssetUploadAction,
  registerAssetAction,
} from "@/app/actions/assets";
import type { AssetDto } from "@/lib/domain/dtos";

type SignatureResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
};

type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format: string;
  original_filename?: string;
  error?: { message: string };
};

function formatCloudinaryError(message: string): string {
  const match = message.match(/Maximum is (\d+)/);
  if (!match) return message;

  const maxMb = Math.round(Number(match[1]) / (1024 * 1024));
  return `El archivo supera el límite de ${maxMb} MB de tu cuenta de Cloudinary`;
}

export async function uploadAsset(file: File, name?: string): Promise<AssetDto> {
  const signatureResult = await prepareAssetUploadAction();
  if ("error" in signatureResult) throw new Error(signatureResult.error);

  const sig: SignatureResponse = signatureResult.data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", String(sig.timestamp));
  formData.append("signature", sig.signature);
  formData.append("folder", sig.folder);

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  const result = (await cloudRes.json()) as CloudinaryUploadResult;
  if (!cloudRes.ok) {
    const message = result.error?.message ?? "Upload failed";
    throw new Error(formatCloudinaryError(message));
  }

  const assetName =
    name ?? file.name.replace(/\.[^/.]+$/, "") ?? result.original_filename ?? "asset";
  const mimeType =
    file.type || (result.format === "json" ? "application/json" : `image/${result.format}`);

  const registerResult = await registerAssetAction({
    publicId: result.public_id,
    url: result.secure_url,
    name: assetName,
    mimeType,
    width: result.width,
    height: result.height,
  });
  if ("error" in registerResult) throw new Error(registerResult.error);
  return registerResult.data;
}
