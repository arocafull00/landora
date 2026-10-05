import { Suspense } from "react";
import type { Metadata } from "next";
import { SignalCasePageContent } from "@/components/templates/signal/signal-case-page-content";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { findSignalCaseBySlug } from "@/lib/signal-cases";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { getPublishedSignalCaseParams } from "@/lib/public-static-params";

type CasePageProps = {
  params: Promise<{ slug: string; caseSlug: string }>;
};

export function generateStaticParams({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return getPublishedSignalCaseParams(slug);
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug, caseSlug } = await params;
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "signal") return {};

  const gallery = resolveGalleryItems("signal", landing.content.gallery ?? []);
  const signalCase = findSignalCaseBySlug(gallery, caseSlug);
  if (!signalCase) return {};

  const title = signalCase.description || signalCase.title || "Caso";

  return createPublishedSiteMetadata({
    landing,
    title: `${title} | ${landing.content.brand}`,
    description: signalCase.caseProblem || landing.seo.description || "",
    pathname: `/casos/${signalCase.projectSlug}`,
    image: signalCase.image,
  });
}

export default function PublicSignalCasePage({ params }: CasePageProps) {
  return (
    <Suspense fallback={<PublicLandingLoading />}>
      {params.then(({ slug, caseSlug }) => (
        <SignalCasePageContent caseSlug={caseSlug} slug={slug} />
      ))}
    </Suspense>
  );
}
