import type { PrivacyBlock } from "@/lib/email-subscriptions/settings";

export function SubscriptionPrivacyBlock({ block }: { block: PrivacyBlock }) {
  if (block.type === "heading") return <h2 className="nuvolets-title mt-10 text-2xl">{block.text}</h2>;
  return <p className="whitespace-pre-line text-site-content leading-relaxed opacity-85">{block.text}</p>;
}
