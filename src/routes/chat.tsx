import { ChatHeader } from '@/components/chat/ChatHeader';
import { ConversationArea } from '@/components/chat/ConversationArea';
import { UsersList } from '@/components/chat/UsersList';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { socket } from '@/config/socket';
import { useEffect } from 'react';

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
  useEffect(() => {
    if(!socket.connected){
      socket.connect()
    }
  }, []);
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
