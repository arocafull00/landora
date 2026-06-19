export async function verifyTurnstileToken(token: string, ip: string | null) {
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }

  const body = new URLSearchParams({ secret, response: token });

  const isValidIp = ip && ip !== "unknown" && ip !== "::1" && ip !== "127.0.0.1";
  if (isValidIp) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.error("[turnstile] verification failed:", data["error-codes"]);
    }

    return data.success === true;
  } catch (err) {
    console.error("[turnstile] fetch error:", err);
    return false;
  }
}
