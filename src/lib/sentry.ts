const dsn = import.meta.env.VITE_SENTRY_DSN;
const isEnabled = import.meta.env.VITE_SENTRY_ENABLED !== 'false';

const toSampleRate = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, 0), 1);
};

const isSentryReady = () => Boolean(dsn && window.Sentry && isEnabled);

export const initSentry = () => {
  if (!dsn || !window.Sentry) {
    return;
  }

  window.Sentry.init({
    dsn,
    environment:
      import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
    release: import.meta.env.VITE_SENTRY_RELEASE,
    tracesSampleRate: toSampleRate(
      import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,
      0.1,
    ),
    replaysSessionSampleRate: toSampleRate(
      import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      0,
    ),
    replaysOnErrorSampleRate: toSampleRate(
      import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
      1,
    ),
    integrations: [window.Sentry.replayIntegration()],
    attachStacktrace: true,
    enabled: isEnabled,
  });
};

export const captureError = (
  error: unknown,
  extras?: Record<string, unknown>,
) => {
  if (!isSentryReady()) {
    return;
  }

  if (!extras) {
    window.Sentry?.captureException(error);
    return;
  }

  window.Sentry?.withScope((scope) => {
    scope.setExtras(extras);
    window.Sentry?.captureException(error);
  });
};

export const captureApiError = (
  error: unknown,
  request: {
    method?: string;
    url?: string;
    status?: number;
  },
) => {
  captureError(error, {
    request_method: request.method?.toUpperCase(),
    request_url: request.url,
    response_status: request.status,
  });
};

export const setSentryUser = (
  user: { id?: string; email?: string; username?: string } | null,
) => {
  if (!isSentryReady()) {
    return;
  }

  window.Sentry?.setUser(user);
};

export const setSentryTag = (key: string, value: string) => {
  if (!isSentryReady()) {
    return;
  }

  window.Sentry?.setTag(key, value);
};
