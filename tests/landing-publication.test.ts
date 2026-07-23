import assert from "node:assert/strict";
import test from "node:test";
import {
  getNextLandingVersion,
  normalizePublishedSlug,
  parsePublishedLandingContent,
} from "@/lib/landing-publication";

const requiredContent = {
  hero: {},
  contact: {},
  brand: "Landora",
  nav: [],
  stats: [],
  testimonials: [],
  appearance: {},
  enabledPages: [],
};

test("increments the latest publication version", () => {
  assert.equal(getNextLandingVersion(null), 1);
  assert.equal(getNextLandingVersion(8), 9);
});

test("normalizes a public slug", () => {
  assert.equal(normalizePublishedSlug("/mi-negocio/"), "mi-negocio");
});

test("rejects incomplete published content", () => {
  assert.throws(() => parsePublishedLandingContent({ hero: {} }));
});

test("restores offer expiration dates from JSON", () => {
  const content = parsePublishedLandingContent({
    ...requiredContent,
    offers: [
      {
        id: "offer-1",
        type: "hero_banner",
        title: "Oferta",
        description: "Descripción",
        enabled: true,
        expiresAt: "2026-08-01T10:00:00.000Z",
      },
    ],
  });

  assert.ok(content.offers?.[0]?.expiresAt instanceof Date);
});
