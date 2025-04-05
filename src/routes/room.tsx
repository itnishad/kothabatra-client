import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useUserStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar';
import Chat from '@/components/chat';
import { User } from '@/lib/types';
import socket from '@/lib/socket';

export const Route = createFileRoute('/room')({
  component: RouteComponent,
});

type Sender = {
  id: string;
  name: string;
};

function RouteComponent() {
  const [user, setUser] = useState<User | undefined>();
  const [sender, setSender] = useState<Sender | undefined>();
  const users = useUserStore((state) => state.users);
  const addMessage = useUserStore((state) => state.addMessage);

  const data: Sender = useSearch({ from: '/room' });

  useEffect(() => {
    setSender(data);
  }, [data]);

  const handleClick = (item: User) => {
    setUser(item);
  };

  const handleMessageClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    message: string
  ) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', { message, user, sender });
      if (user && sender) addMessage(message, sender, user);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <div className="bg-amber-50 md:col-span-3 dark:bg-amber-300">
        <Sidebar users={users} handleClick={handleClick}></Sidebar>
      </div>
      <div className="bg-amber-300 md:col-span-9 dark:bg-amber-50">
        {user && (
          <Chat
            key={user.id}
            user={user}
            handleMessageClick={handleMessageClick}
          ></Chat>
        )}
      </div>
    </div>
  );
}
