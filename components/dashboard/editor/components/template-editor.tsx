"use client";

import { Suspense } from "react";
import { TEMPLATE_EDITOR_COMPONENTS } from "@/components/templates/template-lazy-components";
import { EditorSectionLoadingSkeleton } from "@/components/dashboard/editor-section-loading-skeleton";
import type { TemplateId } from "@/lib/dashboard-data";

export function TemplateEditor({ template, landingId }: { template: TemplateId; landingId: string }) {
  const Component = TEMPLATE_EDITOR_COMPONENTS[template];
  return <Suspense fallback={<EditorSectionLoadingSkeleton />}><Component key={landingId} /></Suspense>;
}
