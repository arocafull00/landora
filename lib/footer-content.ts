import {
  DEFAULT_COPYRIGHT_SUFFIX,
  type ContactContent,
  type SocialLink,
  type SocialPlatform,
} from "@/lib/dashboard-data";

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "instagram",
  "facebook",
  "linkedin",
  "tiktok",
  "youtube",
  "x",
];

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
};

function isSocialPlatform(value: string): value is SocialPlatform {
  return SOCIAL_PLATFORMS.includes(value as SocialPlatform);
}

export function parseSocialLinks(value: unknown): SocialLink[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const platform = "platform" in item && typeof item.platform === "string" ? item.platform : "";
    const url = "url" in item && typeof item.url === "string" ? item.url.trim() : "";
    if (!isSocialPlatform(platform) || !url) return [];
    return [{ platform, url }];
  });
}

function getCopyrightSuffix(contact: ContactContent): string {
  return contact.copyrightSuffix?.trim() || DEFAULT_COPYRIGHT_SUFFIX;
}

export function getCopyrightLine(brand: string, contact: ContactContent): string {
  const normalizedBrand = brand.replace(".", "");
  return `Copyright © ${new Date().getFullYear()} ${normalizedBrand} ${getCopyrightSuffix(contact)}`;
}

export function getFooterAnchor(templateId: string): string {
  if (templateId === "velar") return "inquire";
  return "contacto";
}

export function getSocialUrl(contact: ContactContent, platform: SocialPlatform): string {
  return contact.socialLinks?.find((link) => link.platform === platform)?.url ?? "";
}

export function buildSocialLinks(
  contact: ContactContent,
  platform: SocialPlatform,
  url: string,
): SocialLink[] {
  const trimmedUrl = url.trim();
  const otherLinks = (contact.socialLinks ?? []).filter((link) => link.platform !== platform);
  if (!trimmedUrl) return otherLinks;
  return [...otherLinks, { platform, url: trimmedUrl }];
}
