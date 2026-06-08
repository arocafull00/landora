export function isSvgUrl(url: string): boolean {
  if (!url) return false;

  const path = url.split("?")[0].toLowerCase();
  return path.endsWith(".svg");
}

export function isSvgMime(mimeType?: string): boolean {
  if (!mimeType) return false;

  return mimeType.includes("svg");
}

export function isSvgAsset(url: string, mimeType?: string): boolean {
  return isSvgMime(mimeType) || isSvgUrl(url);
}
