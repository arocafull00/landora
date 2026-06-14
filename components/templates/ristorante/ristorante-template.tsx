import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteFontScope } from "@/components/templates/ristorante/ristorante-font-scope";
import { RistoranteTemplateClient } from "@/components/templates/ristorante/ristorante-template-client";

export function RistoranteTemplate({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  return (
    <RistoranteFontScope>
      <RistoranteTemplateClient content={content} topOffset={topOffset} />
    </RistoranteFontScope>
  );
}
