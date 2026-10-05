import { Suspense } from "react";
import { PreviewLayoutContent } from "@/components/dashboard/preview-layout-content";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";

export default function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<PublicLandingLoading />}>
      <PreviewLayoutContent params={params}>{children}</PreviewLayoutContent>
    </Suspense>
  );
}
