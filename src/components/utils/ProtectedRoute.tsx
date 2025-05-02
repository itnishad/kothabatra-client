import { useAuthStore } from '@/store/authStore';
import { useNavigate } from '@tanstack/react-router';
import { ReactElement, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const { isAuthenticated, getValidAccessToken } = useAuthStore();

  useEffect(() => {
    const authCheck = async () => {
      const token = await getValidAccessToken();
      if (!token) {
        navigate({
          to: '/login',
          search: { redirect: window.location.pathname },
        });
      }
    };

    if (!isAuthenticated) {
      authCheck();
    }
  }, [getValidAccessToken, isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
