export {};

declare global {
  interface Window {
    Sentry?: {
      init: (options: {
        dsn: string;
        environment?: string;
        release?: string;
        tracesSampleRate?: number;
        replaysSessionSampleRate?: number;
        replaysOnErrorSampleRate?: number;
        integrations?: unknown[];
        attachStacktrace?: boolean;
        enabled?: boolean;
      }) => void;
      replayIntegration: () => unknown;
      captureException: (
        error: unknown,
        context?: Record<string, unknown>,
      ) => string;
      captureMessage: (
        message: string,
        context?: Record<string, unknown>,
      ) => string;
      setTag: (key: string, value: string) => void;
      setUser: (
        user: {
          id?: string;
          email?: string;
          username?: string;
        } | null,
      ) => void;
      withScope: (
        callback: (scope: {
          setExtras: (extras: Record<string, unknown>) => void;
          setTag: (key: string, value: string) => void;
        }) => void,
      ) => void;
    };
  }

  interface ImportMetaEnv {
    readonly VITE_SENTRY_DSN?: string;
    readonly VITE_SENTRY_ENVIRONMENT?: string;
    readonly VITE_SENTRY_RELEASE?: string;
    readonly VITE_SENTRY_TRACES_SAMPLE_RATE?: string;
    readonly VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE?: string;
    readonly VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE?: string;
    readonly VITE_SENTRY_ENABLED?: string;
  }
}
