const POSTHOG_QUERY_HOST = process.env.POSTHOG_QUERY_HOST ?? "https://eu.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;

type PostHogQueryResponse = {
  results: unknown[][];
  columns?: string[];
};

export async function queryPostHog(hogql: string): Promise<PostHogQueryResponse> {
  if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_ID) {
    throw new Error("PostHog analytics is not configured");
  }

  const response = await fetch(
    `${POSTHOG_QUERY_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: hogql,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`PostHog query failed with status ${response.status}`);
  }

  return response.json();
}

export function isPostHogConfigured(): boolean {
  return Boolean(POSTHOG_PERSONAL_API_KEY && POSTHOG_PROJECT_ID);
}
