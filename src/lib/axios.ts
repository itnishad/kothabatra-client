import axios from 'axios';
import { router } from './router';

export const api = axios.create({
  baseURL: 'http://localhost:8000/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      router.navigate({ to: '/' });
    }
    return Promise.reject(error);
  }
);
