import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
