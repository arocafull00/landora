import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTemplate, isValidTemplateId } from "@/lib/template-registry";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import {
  TemplateDemoBar,
  TEMPLATE_DEMO_BAR_HEIGHT,
} from "@/components/admin/template-demo-bar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function TemplateDemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { id } = await params;
  const { embed } = await searchParams;

  if (!isValidTemplateId(id)) notFound();

  const template = getTemplate(id);
  if (!template) notFound();

  const isEmbed = embed === "1";

  return (
    <div style={isEmbed ? undefined : { paddingTop: TEMPLATE_DEMO_BAR_HEIGHT }}>
      {!isEmbed && <TemplateDemoBar label={template.label} />}
      <VelarTemplate
        content={template.demoContent}
        topOffset={isEmbed ? 0 : TEMPLATE_DEMO_BAR_HEIGHT}
      />
    </div>
  );
}
