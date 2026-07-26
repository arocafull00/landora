import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { RistoranteMenuPage } from "@/components/templates/ristorante/ristorante-menu-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getPublishedLandingBySlug } from "@/data/landing-publications";

export async function RistoranteMenuPageContent({ slug }: { slug: string }) {
  "use cache";

  cacheLife("max");

  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || landing.template !== "ristorante") {
    notFound();
  }

  const content = landing.content;

  return (
    <SiteThemeScope appearance={content.appearance} template="ristorante">
      <RistoranteMenuPage content={content} slug={slug} />
    </SiteThemeScope>
  );
}
