import type { OfferCard } from "@/lib/dashboard-data";

function getWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function OfferPromotionCard({
  card,
  phone,
}: {
  card: OfferCard;
  phone: string;
}) {
  const ctaLabel = card.ctaText ?? "Ver oferta";
  const href = phone
    ? getWhatsAppLink(phone, `Hola, me interesa: ${card.title}`)
    : undefined;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-outline-variant bg-surface px-5 py-6">
      {card.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-label-sm font-medium text-primary">
          {card.badge}
        </span>
      ) : null}
      <h3 className="text-balance text-xl font-semibold text-on-surface">
        {card.title}
      </h3>
      {card.description ? (
        <p className="mt-2 flex-1 text-pretty text-body-md text-on-surface-variant">
          {card.description}
        </p>
      ) : null}
      {href ? (
        <a
          className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-primary px-4 py-2 text-body-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {ctaLabel}
        </a>
      ) : null}
    </article>
  );
}
