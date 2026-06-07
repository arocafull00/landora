import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByIdAndUserId } from "@/data/landing-pages";
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
  const landing = await getLandingPageByIdAndUserId(id, clientId);
  if (!landing) notFound();

  const content = toLandingContent(landing);

  return <LandingPreviewFrame initialContent={content} template={landing.template} />;
}
