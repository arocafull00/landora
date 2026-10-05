import { Suspense } from "react";
import { PreviewLayoutContent } from "@/components/dashboard/preview-layout-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";

export default function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      <PreviewLayoutContent params={params}>{children}</PreviewLayoutContent>
    </Suspense>
  );
}
