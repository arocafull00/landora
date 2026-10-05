import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NuvoletsNewsletterForm } from "./nuvolets-newsletter-form";

export function NuvoletsNewsletter({ config, slug, preview }: { config: NuvoletsContent["newsletter"]; slug: string; preview: boolean }) {
  return <section><div aria-hidden="true" className="nuvolets-bumps nuvolets-bumps-pink" /><div className="bg-nuvolets-pink-soft"><div className="nuvolets-reveal mx-auto max-w-2xl px-5 py-16 text-center md:py-24"><h2 className="nuvolets-title mb-4 whitespace-pre-line text-site-title">{config.title}</h2><p className="mb-8 text-site-content opacity-80">{config.text}</p><NuvoletsNewsletterForm config={config} slug={slug} preview={preview} /></div></div></section>;
}
