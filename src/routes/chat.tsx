import { ChatHeader } from '@/components/chat/ChatHeader';
import { ConversationArea } from '@/components/chat/ConversationArea';
import { UsersList } from '@/components/chat/UsersList';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { socket } from '@/config/socket';
import { useEffect } from 'react';
import { User } from '@/types';
import { getActiveUsers } from '@/services';
import { useUsersStore } from '@/store/usersStore';

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if(!socket.connected){
      socket.connect()
    }
    if (!context?.user) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  const {setUsers, addUser, deleteUser} = useUsersStore()
  useEffect(()=>{
    const loadActiveUser = async ()=>{
      const data = await getActiveUsers();
      setUsers(data);
    }
    loadActiveUser()
  },[])

  useEffect(()=>{
    const handleJoinUser = (user: User) => {
      addUser(user)
    }
    const handleLeaveUser = (user: Pick<User, 'id' | 'email'>) => {
      deleteUser(user.id)
    }
    socket.on('join-user', handleJoinUser);
    socket.on('leave-user', handleLeaveUser)
    return ()=>{
      socket.removeListener('join-user', handleJoinUser)
      socket.removeListener('leave-user', handleLeaveUser)
    }
  },[])

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
