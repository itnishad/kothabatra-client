import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  const router = useRouter();
  const [user, setUser] = useState<
    { id: string; name: string; email: string } | undefined
  >();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get('/users/me');
      if (response.data) {
        setUser(response.data);
      }
    };

    getUser();
  }, []);

  const handlelogoutClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout();
    router.navigate({ to: '/login' });
  };

  return (
    <div>
      <p>Hello "/about"!</p>
      {user && (
        <div>
          <p>
            <span>ID</span>: {user.id}
          </p>
          <p>
            <span>Name</span>: {user.name}
          </p>
          <p>
            <span>email</span>: {user.email}
          </p>
        </div>
      )}
      <button onClick={handlelogoutClick}>Logout</button>
    </div>
  );
}
