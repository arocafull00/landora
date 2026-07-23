import { redirect } from "next/navigation";
import { AssetsSection } from "@/components/dashboard/sections/assets-section";
import { getAssetsByUserId } from "@/data/assets";
import { getEffectiveClientId } from "@/lib/auth";
import { toAssetDto } from "@/lib/domain/mappers";
import { AssetsStoreProvider } from "@/stores/assets-store";

export default async function AssetsPage() {
  const userId = await getEffectiveClientId();
  if (!userId) redirect("/sign-in");

  const rows = await getAssetsByUserId(userId);

  return (
    <AssetsStoreProvider initialRows={rows.map(toAssetDto)}>
      <AssetsSection />
    </AssetsStoreProvider>
  );
}
