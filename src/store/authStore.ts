import { create } from 'zustand';
import { RegisterData, User } from '@/types';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  initAuth: () => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: (skipServer?: boolean) => Promise<void>;
};

const checkAuthentication = async () => {
  try {
    const response = await api.get('/auth/me');
    return {
      user: response.data,
      isAuthenticated: true,
    };
  } catch {
    return {
      user: null,
      isAuthenticated: false,
    };
  }
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: 0,
  initAuth: async () => {
    set({ isLoading: true });

    const authResult = await checkAuthentication();
    set({
      user: authResult.user,
      isAuthenticated: authResult.isAuthenticated,
      isLoading: false,
    });
    return authResult.user;
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/login', { email, password });
      const newState = {
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      return response.data.user;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorState = {
        error: error.response?.data?.message ?? 'Login failed',
        isLoading: false,
      };
      set(errorState);
      throw error;
    }
  },
  register: async (userData: RegisterData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/register', userData);
      const newState = {
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      };

      set(newState);

      return response.data.user;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorState = {
        error: error.response?.data?.message ?? 'Registration failed',
        isLoading: false,
      };
      set(errorState);
      throw error;
    }
  },
  logout: async (skipServer) => {
    try {
      if (!skipServer) {
        await api.post('/auth/logout');
      }
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.log(error);
      // throw error;
    }
  },
}));
