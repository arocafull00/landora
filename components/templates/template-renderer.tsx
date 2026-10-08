import "server-only";

import { getTemplateRendererLoader } from "@/lib/templates/renderer";
import type { TemplateId } from "@/lib/dashboard-data";
import type { TemplateRenderProps } from "@/lib/templates/types";

export async function TemplateRenderer({ template, ...props }: TemplateRenderProps & { template: TemplateId }) {
  const loader = getTemplateRendererLoader(template, props.content.rendererVersion ?? 1);
  const Component = await loader();
  return <Component {...props} />;
}
