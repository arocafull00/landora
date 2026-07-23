import { PreviewBridgeProvider } from "@/components/dashboard/preview-bridge-provider";

export default async function PreviewLayout({
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
