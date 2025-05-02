import { useAuthStore } from '@/store/authStore';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';

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
  const handlelogoutClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout();
    router.navigate({ to: '/login' });
  };

  const logout = useAuthStore((state) => state.logout);
  return (
    <div>
      <p>Hello "/about"!</p>
      <button onClick={handlelogoutClick}>Logout</button>
    </div>
  );
}
