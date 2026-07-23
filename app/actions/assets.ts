"use server";

import { revalidatePath } from "next/cache";
import {
  deleteAssetById,
  getAssetByIdAndUserId,
  insertAsset,
  updateAssetName,
} from "@/data/assets";
import { getEffectiveClientId } from "@/lib/auth";
import {
  cloudinary,
  deleteCloudinaryAsset,
  getAssetFolder,
} from "@/lib/cloudinary";
import { requireServerEnv } from "@/lib/env/server";
import type { AssetDto } from "@/lib/domain/dtos";
import { toAssetDto } from "@/lib/domain/mappers";
import { logger } from "@/lib/logger";
import {
  createAssetSchema,
  resourceIdSchema,
  updateAssetSchema,
} from "@/lib/schemas/api";

type AssetResult =
  | { success: true; data: AssetDto }
  | { error: string };

type UploadSignatureResult =
  | {
      success: true;
      data: {
        cloudName: string;
        apiKey: string;
        timestamp: number;
        signature: string;
        folder: string;
      };
    }
  | { error: string };

function revalidateAssetConsumers() {
  revalidatePath("/assets");
  revalidatePath("/editor");
  revalidatePath("/blog");
}

export async function prepareAssetUploadAction(): Promise<UploadSignatureResult> {
  const userId = await getEffectiveClientId();
  if (!userId) return { error: "No autorizado" };

  try {
    const cloudName = requireServerEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    const apiKey = requireServerEnv("CLOUDINARY_API_KEY");
    const apiSecret = requireServerEnv("CLOUDINARY_API_SECRET");
    const folder = getAssetFolder(userId);
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      apiSecret,
    );

    return {
      success: true,
      data: { cloudName, apiKey, timestamp, signature, folder },
    };
  } catch (error) {
    logger.captureException(error, {
      action: "prepare-asset-upload",
      tenantId: userId,
    });
    return { error: "No se pudo preparar la subida" };
  }
}

export async function registerAssetAction(input: unknown): Promise<AssetResult> {
  const userId = await getEffectiveClientId();
  if (!userId) return { error: "No autorizado" };

  const parsed = createAssetSchema.safeParse(input);
  if (!parsed.success) return { error: "Datos de imagen no válidos" };

  const folderPrefix = getAssetFolder(userId);
  if (!parsed.data.publicId.startsWith(folderPrefix)) {
    return { error: "No autorizado" };
  }

  try {
    const row = await insertAsset({
      userId,
      publicId: parsed.data.publicId,
      url: parsed.data.url,
      name: parsed.data.name,
      mimeType: parsed.data.mimeType,
      width: parsed.data.width ?? null,
      height: parsed.data.height ?? null,
    });
    revalidateAssetConsumers();
    return { success: true, data: toAssetDto(row) };
  } catch (error) {
    logger.captureException(error, {
      action: "register-asset",
      tenantId: userId,
    });
    return { error: "No se pudo guardar la imagen" };
  }
}

export async function renameAssetAction(
  id: string,
  name: string,
): Promise<AssetResult> {
  const userId = await getEffectiveClientId();
  if (!userId) return { error: "No autorizado" };

  const parsedId = resourceIdSchema.safeParse(id);
  const parsedInput = updateAssetSchema.safeParse({ name });
  if (!parsedId.success || !parsedInput.success) {
    return { error: "Datos de imagen no válidos" };
  }

  try {
    const row = await updateAssetName(
      parsedId.data,
      userId,
      parsedInput.data.name,
    );
    if (!row) return { error: "Imagen no encontrada" };
    revalidateAssetConsumers();
    return { success: true, data: toAssetDto(row) };
  } catch (error) {
    logger.captureException(error, {
      action: "rename-asset",
      tenantId: userId,
    });
    return { error: "No se pudo renombrar la imagen" };
  }
}

export async function deleteAssetAction(
  id: string,
): Promise<{ success: true } | { error: string }> {
  const userId = await getEffectiveClientId();
  if (!userId) return { error: "No autorizado" };

  const parsedId = resourceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Imagen no válida" };

  try {
    const row = await getAssetByIdAndUserId(parsedId.data, userId);
    if (!row) return { error: "Imagen no encontrada" };
    if (!row.publicId.startsWith(getAssetFolder(userId))) {
      return { error: "No autorizado" };
    }

    const deleted = await deleteCloudinaryAsset(row.publicId, row.mimeType);
    if (!deleted) return { error: "No se pudo eliminar la imagen" };

    await deleteAssetById(parsedId.data, userId);
    revalidateAssetConsumers();
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "delete-asset",
      tenantId: userId,
    });
    return { error: "No se pudo eliminar la imagen" };
  }
}
