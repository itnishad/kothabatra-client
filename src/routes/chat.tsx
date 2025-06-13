import { ChatHeader } from '@/components/chat/ChatHeader';
import { ConversationArea } from '@/components/chat/ConversationArea';
import { UsersList } from '@/components/chat/UsersList';
import { createFileRoute, redirect } from '@tanstack/react-router';
// import { initSocket } from '@/config/socket';
// import { useEffect } from 'react';

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    console.log(context);
    if (!context?.user) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  // useEffect(() => {
  //   initSocket(accessToken);
  // }, []);
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
