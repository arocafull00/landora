"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { serverEnv } from "@/lib/env/server";
import { logger } from "@/lib/logger";
import { getRedis } from "@/lib/redis";
import { signalContactSubmissionSchema } from "@/lib/schemas/signal-contact";

type SignalContactResult =
  | { status: "sent" }
  | { status: "invalid" | "unavailable" | "failed"; error: string };

const emailResponseSchema = z.strictObject({ id: z.string().min(1) });

export async function submitSignalContactAction(input: unknown): Promise<SignalContactResult> {
  const parsed = signalContactSubmissionSchema.safeParse(input);
  if (!parsed.success || parsed.data.honeypot) {
    return { status: "invalid", error: "Revisa los datos del formulario." };
  }

  try {
    const landing = await getPublishedLandingBySlug(parsed.data.slug);
    if (!landing || landing.template !== "signal") {
      return { status: "unavailable", error: "El formulario no está disponible." };
    }

    const recipient = z.email().safeParse(landing.content.contact.email);
    const redis = getRedis();
    if (
      !recipient.success ||
      !redis ||
      !serverEnv.RESEND_API_KEY ||
      !serverEnv.RESEND_FROM_EMAIL
    ) {
      logger.warn("Signal contact form is not configured");
      return { status: "unavailable", error: "El formulario no está disponible. Usa el correo de contacto." };
    }

    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "signal:contact",
    });
    const limit = await limiter.limit(`${landing.id}:${ip}`);
    if (!limit.success) {
      return { status: "failed", error: "Demasiados intentos. Inténtalo más tarde." };
    }

    const { name, company, email, phone, message } = parsed.data;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serverEnv.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: serverEnv.RESEND_FROM_EMAIL,
        to: [recipient.data],
        reply_to: email,
        subject: `Nuevo contacto desde ${landing.content.brand}`,
        text: `Nombre: ${name}\nEmpresa: ${company || "—"}\nEmail: ${email}\nTeléfono: ${phone || "—"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok || !emailResponseSchema.safeParse(await response.json()).success) {
      logger.warn(logger.fmt`Signal contact delivery failed with HTTP ${response.status}`);
      return { status: "failed", error: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
    }

    return { status: "sent" };
  } catch (error) {
    logger.captureException(error, { action: "signal-contact" });
    return { status: "failed", error: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }
}
