"use client";

import { Suspense } from "react";
import { TEMPLATE_PREVIEW_COMPONENTS } from "@/components/templates/template-lazy-components";
import { PublicLandingLoading } from "@/components/templates/public-landing-loading";
import type { TemplateId } from "@/lib/dashboard-data";
import type { TemplateRenderProps } from "@/lib/templates/types";

export function TemplatePreview({ template, ...props }: TemplateRenderProps & { template: TemplateId }) {
  const Component = TEMPLATE_PREVIEW_COMPONENTS[template][props.content.rendererVersion ?? 1];
  if (!Component) throw new Error("Unsupported template renderer version");
  return <Suspense fallback={<PublicLandingLoading />}><Component {...props} /></Suspense>;
}
