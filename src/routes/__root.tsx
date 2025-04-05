import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header></Header>
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
