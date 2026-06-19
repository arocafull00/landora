export function formatServicePrice(priceCents: number): string {
  const euros = priceCents / 100;
  if (priceCents % 100 === 0) {
    return `${euros}€`;
  }
  return `${euros.toFixed(2).replace(".", ",")}€`;
}

export function priceCentsToEurosInput(priceCents: number): string {
  if (priceCents === 0) {
    return "";
  }
  const euros = priceCents / 100;
  if (priceCents % 100 === 0) {
    return String(euros);
  }
  return euros.toFixed(2).replace(".", ",");
}

export function parseEurosToPriceCents(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) {
    return 0;
  }
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }
  const euros = Number(normalized);
  if (!Number.isFinite(euros) || euros < 0) {
    return null;
  }
  return Math.round(euros * 100);
}
