import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEffectiveClientId } from "@/lib/auth";
import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { toLandingContent } from "@/lib/landing-mapper";
import { LandingPreviewFrame } from "@/components/dashboard/landing-preview-frame";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function LandingPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const { id } = await params;
  const landing = await getAuthorizedLanding(id);
  if (!landing) notFound();

  const content = toLandingContent(landing);

  return <LandingPreviewFrame initialContent={content} template={landing.template} />;
}
