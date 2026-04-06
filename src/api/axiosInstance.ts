import axios from 'axios';

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
    const isAuthFlowRequest =
      requestUrl.includes('/login') ||
      requestUrl.includes('/signup') ||
      requestUrl.includes('/sms');

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
