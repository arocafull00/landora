import { PreviewBridgeProvider } from "@/components/dashboard/preview-bridge-provider";

export async function PreviewLayoutContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PreviewBridgeProvider landingId={id}>
      {children}
    </PreviewBridgeProvider>
  );
}
