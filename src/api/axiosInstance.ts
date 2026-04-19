import axios from 'axios';
import { captureApiError } from '@/lib/sentry';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return Promise.reject(new axios.CanceledError('오프라인 상태입니다.'));
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? '';
    const method = error.config?.method;
    const isAuthFlowRequest =
      requestUrl.includes('/login') ||
      requestUrl.includes('/signup') ||
      requestUrl.includes('/sms');
    const isCanceledError = axios.isCancel(error);

    if (!isCanceledError && status !== 401) {
      captureApiError(error, {
        method,
        url: requestUrl,
        status,
      });
    }

    if (
      status === 401 &&
      !isAuthFlowRequest &&
      window.location.pathname !== '/login'
    ) {
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);
