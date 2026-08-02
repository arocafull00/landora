import { Suspense } from "react";
import { PreviewLayoutContent } from "@/components/dashboard/preview-layout-content";

export default function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <PreviewLayoutContent params={params}>{children}</PreviewLayoutContent>
    </Suspense>
  );
}
