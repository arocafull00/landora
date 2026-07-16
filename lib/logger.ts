import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

type SentryLogArgs =
  | [message: string, attributes?: Record<string, unknown>]
  | [
      messageTemplate: string,
      messageParams: readonly unknown[],
      attributes?: Record<string, unknown>,
    ];

type SentryLogMethod = (...args: SentryLogArgs) => void;

function forwardSentryLog(
  method: typeof Sentry.logger.info,
  args: SentryLogArgs,
) {
  (method as SentryLogMethod)(...args);
}

export const logger = {
  fmt: Sentry.logger.fmt,

  info(...args: SentryLogArgs) {
    if (isDev) {
      console.info(...args);
    }

    forwardSentryLog(Sentry.logger.info, args);
  },

  warn(...args: SentryLogArgs) {
    if (isDev) {
      console.warn(...args);
    }

    forwardSentryLog(Sentry.logger.warn, args);
  },

  error(...args: SentryLogArgs) {
    if (isDev) {
      console.error(...args);
    }

    forwardSentryLog(Sentry.logger.error, args);
  },

  captureException(
    error: unknown,
    context?: {
      action?: string;
      tenantId?: string | null;
      userId?: string;
      store?: string;
      [key: string]: unknown;
    },
  ) {
    if (isDev) {
      console.error(error, context);
    }

    Sentry.withScope((scope) => {
      if (!context) {
        Sentry.captureException(error);
        return;
      }

      const { action, tenantId, userId, store, ...rest } = context;

      if (action) scope.setTag("action", action);
      if (store) scope.setTag("store", store);
      if (tenantId) scope.setTag("tenant_id", tenantId);
      if (userId) scope.setUser({ id: userId });

      if (Object.keys(rest).length > 0) {
        scope.setExtras(rest);
      }

      Sentry.captureException(error);
    });
  },

  captureMessage(message: string) {
    if (isDev) {
      console.info(message);
    }

    Sentry.captureMessage(message);
  },
};
