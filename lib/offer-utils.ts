export function isOfferActive(offer: { enabled: boolean; expiresAt?: Date }): boolean {
  return offer.enabled && (!offer.expiresAt || offer.expiresAt > new Date());
}
