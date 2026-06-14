import type { AssetRow } from "@/db/schema";

export async function renameAsset(id: string, name: string): Promise<AssetRow> {
  const res = await fetch(`/api/assets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "No se pudo renombrar la imagen");
  }

  return res.json() as Promise<AssetRow>;
}
