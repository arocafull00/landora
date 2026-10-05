import { ArrowLeft } from "lucide-react";
import { parsePrivacyBlocks } from "@/lib/email-subscriptions/settings";
import { SUBSCRIPTION_PRIVACY_COPY as copy } from "@/lib/email-subscriptions/copy";
import { SubscriptionPrivacyBlock } from "./components/subscription-privacy-block";

export function SubscriptionPrivacyPage({ brand, title, text, homeHref }: { brand: string; title: string; text: string; homeHref: string }) {
  const blocks = parsePrivacyBlocks(text);
  return (
    <div className="nuvolets min-h-screen bg-nuvolets-background text-nuvolets-text">
      <a href="#privacy-main" className="sr-only focus:not-sr-only focus:block focus:p-4">{copy.skip}</a>
      <main id="privacy-main" className="mx-auto max-w-3xl space-y-4 px-5 py-12 md:py-20">
        <a href={homeHref} className="nuvolets-link inline-flex items-center gap-2 text-sm"><ArrowLeft aria-hidden size={16} />{copy.back} {brand}</a>
        <h1 className="nuvolets-title mb-6 text-site-title">{title}</h1>
        {blocks.map((block, index) => <SubscriptionPrivacyBlock key={index} block={block} />)}
      </main>
    </div>
  );
}
