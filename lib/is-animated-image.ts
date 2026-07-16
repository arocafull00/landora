function isAnimatedMime(mimeType?: string): boolean {
  if (!mimeType) return false;

  const normalizedMimeType = mimeType.toLowerCase();
  return normalizedMimeType.includes("gif") || normalizedMimeType.includes("apng");
}

function isAnimatedUrl(url: string): boolean {
  if (!url) return false;

  const path = url.split(/[?#]/)[0].toLowerCase();
  return path.endsWith(".gif") || path.endsWith(".apng");
}

export function isAnimatedImageAsset(
  url: string,
  mimeType?: string,
): boolean {
  return isAnimatedMime(mimeType) || isAnimatedUrl(url);
}
