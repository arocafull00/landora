export function isOfferActive(
  offer: { enabled: boolean; expiresAt?: Date },
  renderedAt = new Date(),
): boolean {
  return offer.enabled && (!offer.expiresAt || offer.expiresAt > renderedAt);
}
