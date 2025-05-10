import { ChatHeader } from '@/components/chat/ChatHeader';
import { ConversationArea } from '@/components/chat/ConversationArea';
import { UsersList } from '@/components/chat/UsersList';
import { useAuthStore } from '@/store/authStore';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <UsersList />
        <ConversationArea />
      </div>
    </div>
  );
}
