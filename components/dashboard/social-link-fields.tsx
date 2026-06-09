"use client";

import type { ContactContent, SocialPlatform } from "@/lib/dashboard-data";
import {
  SOCIAL_PLATFORM_LABELS,
  buildSocialLinks,
  getSocialUrl,
} from "@/lib/footer-content";

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "instagram",
  "facebook",
  "linkedin",
  "tiktok",
  "youtube",
  "x",
];

type SocialLinkFieldsProps = {
  contact: ContactContent;
  onChange: (socialLinks: ContactContent["socialLinks"]) => void;
};

export function SocialLinkFields({ contact, onChange }: SocialLinkFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-label text-label-md text-on-surface-variant">Redes sociales</p>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Solo se mostrarán las plataformas con URL.
        </p>
      </div>
      {SOCIAL_PLATFORMS.map((platform) => (
        <SocialLinkField
          contact={contact}
          key={platform}
          onChange={onChange}
          platform={platform}
        />
      ))}
    </div>
  );
}

function SocialLinkField({
  contact,
  onChange,
  platform,
}: {
  contact: ContactContent;
  onChange: (socialLinks: ContactContent["socialLinks"]) => void;
  platform: SocialPlatform;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {SOCIAL_PLATFORM_LABELS[platform]}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) =>
          onChange(buildSocialLinks(contact, platform, event.target.value))
        }
        placeholder="https://"
        type="url"
        value={getSocialUrl(contact, platform)}
      />
    </label>
  );
}
