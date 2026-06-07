import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTemplate, isValidTemplateId } from "@/lib/template-registry";
import { TollStoryTemplate } from "@/components/templates/toll-story/toll-story-template";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { TemplateDemoBar } from "@/components/admin/template-demo-bar";

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

  const TemplateComponent =
    id === "toll-story"
      ? TollStoryTemplate
      : id === "velar"
        ? VelarTemplate
        : null;

  if (!TemplateComponent) notFound();

  return (
    <div className={isEmbed ? "" : "pt-[52px]"}>
      {!isEmbed && <TemplateDemoBar label={template.label} />}
      <TemplateComponent content={template.demoContent} />
    </div>
  );
}
