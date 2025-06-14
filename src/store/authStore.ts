import { create } from 'zustand';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { RegisterData } from '@/types';
import { api } from '@/lib/axios';

type User = {
  id: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  accessToken: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  initAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: (skipServer?: boolean) => Promise<void>;
  generateAccessToken: () => Promise<void>;
  isTokenExpired: (token: string) => boolean;
  getValidAccessToken: () => Promise<string | void | null>;
};

const loadUserData = (): User | null => {
  try {
    const saveUser = localStorage.getItem('auth-user');
    if (saveUser) {
      return JSON.parse(saveUser);
    }
  } catch (error) {
    console.log('Failed to load User Data', error);
  }

  return null;
};

const saveUserData = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem('auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth-user');
    }
  } catch (error) {
    console.log('Failed to save user data:', error);
  }
};

const checkAuthentication = async () => {
  try {
    const response = await api.get('/auth/me');
    // saveUserData(response.data.user);
    return {
      user: response.data.user,
      isAuthenticated: true,
    };
  } catch {
    return {
      user: null,
      isAuthenticated: false,
    };
  }
};

const initialUser = loadUserData();

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: initialUser,
  accessToken: '',
  isAuthenticated: !!initialUser,
  isLoading: false,
  error: 0,
  initAuth: async () => {
    set({ isLoading: true });
    try {
      const { accessToken, getValidAccessToken } = get();
      if (accessToken) return;
      const token = await getValidAccessToken();
      if (!token) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
      const user = await checkAuthentication();
      set({
        user: user.user,
        isAuthenticated: user.isAuthenticated,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post('/auth/login', { email, password });
      const accessToken = response.data.token;
      const newState = {
        user: response.data.user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      saveUserData(response.data.user);
      return response.data;
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
      const accessToken = response.data.accessToken;
      const newState = {
        user: response.data.user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
      };

      set(newState);
      saveUserData(response.data.user);

      return response.data;
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
      set({ user: null, accessToken: '', isAuthenticated: false });
      saveUserData(null);
    } catch (error) {
      console.log(error);
      // throw error;
    }
  },
  generateAccessToken: async () => {
    try {
      const response = await api.post('/auth/access-token');
      const { token } = response.data;
      set({ accessToken: token });
      return token;
    } catch (err) {
      const error = err as AxiosError;
      throw error;
    }
  },
  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired (current time is past expiration)
      return decoded.exp ? decoded.exp * 1000 < Date.now() : false;
    } catch (error) {
      console.log(error);
      return true;
    }
  },
  getValidAccessToken: async () => {
    const { generateAccessToken } = get();
    // Try to get new access token using the HTTP-only refresh token cookie
    try {
      return await generateAccessToken();
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
