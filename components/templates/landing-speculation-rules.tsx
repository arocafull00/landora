const speculationRules = JSON.stringify({
  prerender: [
    {
      where: {
        and: [
          { href_matches: "/*" },
          { not: { href_matches: "/api/*" } },
          { not: { href_matches: "/ingest/*" } },
          { not: { href_matches: "/monitoring*" } },
          { not: { selector_matches: "[href^='#']" } },
          { not: { selector_matches: "[target='_blank']" } },
          { not: { selector_matches: "[rel~=nofollow]" } },
          { not: { selector_matches: "[data-no-prerender]" } },
        ],
      },
      eagerness: "moderate",
    },
  ],
});

export function LandingSpeculationRules() {
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: speculationRules }}
    />
  );
}
