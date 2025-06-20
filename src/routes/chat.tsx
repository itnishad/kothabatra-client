import { ChatHeader } from '@/components/chat/ChatHeader';
import { ConversationArea } from '@/components/chat/ConversationArea';
import { UsersList } from '@/components/chat/UsersList';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { socket } from '@/config/socket';
import { useEffect } from 'react';
import { getActiveUsers } from '@/services';
import { useUsersStore } from '@/store/usersStore';
import { useMessageStore } from '@/store/messageStore';
import { Message } from '@/types';

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
  const {userList, selectedUser, setUsers} = useUsersStore()
  const addMessage = useMessageStore((state)=> state.addMessage)
  
  useEffect(()=>{
    const loadActiveUser = async ()=>{
      const data = await getActiveUsers();
      setUsers(data);
    }
    loadActiveUser()
  },[])

  useEffect(()=>{
    const handleRecieveMessage = async (message: Message) =>{
      console.log(message)
      const userIds = userList.map(user => user.id)
      console.log(userIds.includes(message.sender.id))
      // if(userIds.includes(message.sender.id)){
      // }
      addMessage(message.sender.id, message)
    }
    socket.on('recieve-message', handleRecieveMessage)

    return ()=>{
      socket.removeListener('recieve-message', handleRecieveMessage)
    }
  },[])

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <UsersList />
        {selectedUser && <ConversationArea selectedUser={selectedUser}/>}
      </div>
    </div>
  );
}
