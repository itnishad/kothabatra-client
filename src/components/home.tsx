import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import socket from '@/lib/socket';
import { useUserStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateUser } from '@/lib/utils';
import { User } from '@/lib/types';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const addUser = useUserStore((state) => state.addUser);
  const addMessage = useUserStore((state) => state.addMessage);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleJoinRoom = () => {
    if (name.trim()) {
      const user = generateUser(name);
      socket.emit('addUser', user);
      navigate({ to: `/room`, search: user });
    }
  };

  useEffect(() => {
    socket.on('newUser', (users: User[]) => {
      addUser(users);
    });
    socket.on('receive-message', (data) => {
      const { message, sender } = data;
      addMessage(message, sender, sender);
    });
  }, [addUser, addMessage]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="w-90 flex justify-center items-center space-x-2">
        <Input
          value={name}
          onChange={handleName}
          type="text"
          placeholder="Name"
        />
        <Button
          onClick={handleJoinRoom}
          type="submit"
          className="bg-blue-600 px-8"
        >
          JOIN
        </Button>
      </div>
    </div>
  );
};

export default Home;
