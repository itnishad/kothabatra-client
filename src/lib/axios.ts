import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

interface ApiError {
  statusCode: number;
  message: string;
  timestamp: string;
}

export const api = axios.create({
  baseURL: 'http://localhost:8000/v1',
  withCredentials: true,
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(async (config) => {
  if (
    config.url?.includes('/auth/login') ||
    config.url?.includes('/auth/register') ||
    config.url?.includes('/auth/access-token')
    // config.url?.includes('/auth/me')
  ) {
    return config;
  }

  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !error.response?.data.message.includes('Refresh Token')
    ) {
      originalRequest._retry = true;
      try {
        const getValidateAccessToken =
          useAuthStore.getState().getValidAccessToken;
        const token = await getValidateAccessToken();
        if (token) {
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          // If we can't get a valid token, redirect to login
          useAuthStore.getState().logout(true);
          window.location.href = '/login';
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch {
        // If refresh fails, redirect to login
        useAuthStore.getState().logout(true);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
