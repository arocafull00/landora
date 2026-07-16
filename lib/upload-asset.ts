import type { AssetRow } from "@/lib/domain/dtos";

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

export async function uploadAsset(file: File, name?: string): Promise<AssetRow> {
  const sigRes = await fetch("/api/assets/signature");
  if (!sigRes.ok) throw new Error("No se pudo preparar la subida");

  const sig = (await sigRes.json()) as SignatureResponse;

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

  const registerRes = await fetch("/api/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      publicId: result.public_id,
      url: result.secure_url,
      name: assetName,
      mimeType,
      width: result.width,
      height: result.height,
    }),
  });

  if (!registerRes.ok) {
    const data = (await registerRes.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Upload failed");
  }

  return registerRes.json() as Promise<AssetRow>;
}
