import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TemplateDemoBar, TEMPLATE_DEMO_BAR_HEIGHT } from "@/components/admin/template-demo-bar";
import { SignalCasePage } from "@/components/templates/signal/signal-case-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getCopyrightYear } from "@/lib/copyright-year";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { findSignalCaseBySlug } from "@/lib/signal-cases";
import { getTemplate } from "@/lib/template-registry";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SignalDemoCasePage({
  params,
}: {
  params: Promise<{ caseSlug: string }>;
}) {
  const { caseSlug } = await params;
  const template = getTemplate("signal");
  if (!template) notFound();

  const content = await template.loadContent();
  const gallery = resolveGalleryItems("signal", content.gallery ?? []);
  const signalCase = findSignalCaseBySlug(gallery, caseSlug);
  if (!signalCase) notFound();

  return (
    <div style={{ paddingTop: TEMPLATE_DEMO_BAR_HEIGHT }}>
      <TemplateDemoBar label={template.label} />
      <SiteThemeScope appearance={content.appearance} template="signal">
        <SignalCasePage
          content={content}
          copyrightYear={await getCopyrightYear()}
          homeHref="/admin/templates/signal"
          item={signalCase}
          previewMode
          slug=""
        />
      </SiteThemeScope>
    </div>
  );
}
